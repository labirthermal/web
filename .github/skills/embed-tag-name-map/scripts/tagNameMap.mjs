#!/usr/bin/env node
/**
 * Reports the `HTMLElementTagNameMap` declaration status of web components in
 * any package of the monorepo.
 *
 * Tag names come from the package's `src/iifeCatalog.ts` when it exists and
 * from `@customElement("tag")` / `customElements.define("tag", Class)` otherwise.
 *
 * Usage (run from anywhere):
 *   node tagNameMap.mjs <file>             # is the file a web component? which tags, declared?
 *   node tagNameMap.mjs <tag|class>        # catalog entry by tag or class name
 *   node tagNameMap.mjs                    # all catalog entries of the current package
 *   node tagNameMap.mjs --missing          # only entries without a declaration
 *   node tagNameMap.mjs <query> --json     # machine readable output
 *   node tagNameMap.mjs ... --package <dir>  # force the package directory
 *
 * Exit codes: 0 found, 1 nothing found, 2 file is not a web component.
 */

import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const flagValue = (name) => {
    const index = args.indexOf(name);
    return index === -1 ? null : args[index + 1] ?? null;
};
const packageFlag = flagValue("--package");
const asJson = args.includes("--json");
const onlyMissing = args.includes("--missing");
const query = args.find((arg, i) => !arg.startsWith("--") && args[i - 1] !== "--package") ?? null;

const findUp = (start, predicate) => {
    let dir = start;
    while (true) {
        if (predicate(dir)) {
            return dir;
        }
        const parent = path.dirname(dir);
        if (parent === dir) {
            return null;
        }
        dir = parent;
    }
};

const packageRootOf = (from) => findUp(from, (dir) => fs.existsSync(path.join(dir, "package.json")));
const repoRoot = findUp(process.cwd(), (dir) => fs.existsSync(path.join(dir, "pnpm-workspace.yaml"))) ?? process.cwd();

const queryFile = query && /[\\/]|\.(ts|tsx|js|mjs)$/.test(query)
    ? [path.resolve(query), path.resolve(repoRoot, query)].find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile())
    : null;

const catalogOf = (pkgDir) => path.join(pkgDir, "src", "iifeCatalog.ts");

/** Packages whose catalogs are consulted. */
const packageDirs = (() => {
    if (packageFlag) {
        return [path.resolve(packageFlag)];
    }
    const own = packageRootOf(queryFile ? path.dirname(queryFile) : process.cwd());
    if (own && (queryFile || fs.existsSync(catalogOf(own)))) {
        return [own];
    }
    const packagesDir = path.join(repoRoot, "packages");
    if (!fs.existsSync(packagesDir)) {
        return own ? [own] : [];
    }
    return fs.readdirSync(packagesDir)
        .map((name) => path.join(packagesDir, name))
        .filter((dir) => fs.existsSync(catalogOf(dir)));
})();

const sourceCache = new Map();
const readSource = (file) => {
    if (!sourceCache.has(file)) {
        sourceCache.set(file, fs.readFileSync(file, "utf8"));
    }
    return sourceCache.get(file);
};

const resolveFile = (srcDir, specifier) => {
    if (!specifier || !specifier.startsWith(".")) {
        return null;
    }
    const base = path.resolve(srcDir, specifier);
    for (const candidate of [`${base}.ts`, path.join(base, "index.ts")]) {
        if (fs.existsSync(candidate)) {
            return candidate;
        }
    }
    return null;
};

const declaredTagsOf = (source) => {
    const tags = new Set();
    for (const block of source.matchAll(/interface\s+HTMLElementTagNameMap\s*\{([\s\S]*?)\}/g)) {
        for (const line of block[1].matchAll(/["']([^"']+)["']\s*:/g)) {
            tags.add(line[1]);
        }
    }
    return tags;
};

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Classes of a file with the tag registered through decorator or `customElements.define`. */
const classesOf = (source) => {
    const classes = [];
    const classPattern = /(?:@customElement\(\s*["']([^"']+)["']\s*\)\s*)?(export\s+(?:default\s+)?)?(abstract\s+)?class\s+([A-Za-z_$][\w$]*)\s+extends\s+([A-Za-z_$][\w$.<>, ]*?)\s*(?:implements[^{]*)?\{/g;
    for (const match of source.matchAll(classPattern)) {
        const [, decoratorTag, exported, isAbstract, className, base] = match;
        const defined = source.match(new RegExp(`customElements\\.define\\(\\s*["']([^"']+)["']\\s*,\\s*${escapeRegExp(className)}\\b`))?.[1] ?? null;
        classes.push({
            className,
            base: base.trim(),
            exported: Boolean(exported),
            abstract: Boolean(isAbstract),
            registeredTag: decoratorTag ?? defined ?? null,
            registeredBy: decoratorTag ? "@customElement" : defined ? "customElements.define" : null,
        });
    }
    return classes;
};

/** Catalog entries (tag, class, resolved file) of one package. */
const catalogEntriesOf = (pkgDir) => {
    const catalogPath = catalogOf(pkgDir);
    if (!fs.existsSync(catalogPath)) {
        return [];
    }
    const srcDir = path.join(pkgDir, "src");
    const catalogSource = readSource(catalogPath);

    const importsByClass = new Map();
    for (const match of catalogSource.matchAll(/import\s*\{\s*([^}]+?)\s*\}\s*from\s*["']([^"']+)["']/g)) {
        for (const rawName of match[1].split(",")) {
            const name = rawName.replace(/^type\s+/, "").split(/\s+as\s+/).pop().trim();
            if (name) {
                importsByClass.set(name, match[2]);
            }
        }
    }

    const entries = [];
    const seenTags = new Set();
    const entryPattern = /^\s*["']([a-z][a-z0-9]*(?:-[a-z0-9]+)+)["']\s*:\s*([A-Za-z_$][\w$]*)\s*,?\s*$/gm;
    for (const [, tag, className] of catalogSource.matchAll(entryPattern)) {
        if (seenTags.has(tag)) {
            continue;
        }
        seenTags.add(tag);
        const specifier = importsByClass.get(className) ?? null;
        const file = resolveFile(srcDir, specifier);
        const source = file ? readSource(file) : null;
        const declared = source ? declaredTagsOf(source) : new Set();
        const own = source ? classesOf(source).find((cls) => cls.className === className) : null;
        entries.push({
            package: path.relative(repoRoot, pkgDir) || ".",
            tag,
            className,
            specifier,
            file: file ? path.relative(repoRoot, file) : null,
            absoluteFile: file,
            exportsClass: source ? new RegExp(`export\\s+(?:abstract\\s+)?class\\s+${escapeRegExp(className)}\\b`).test(source) : false,
            decoratorTag: own?.registeredBy === "@customElement" ? own.registeredTag : null,
            declared: declared.has(tag),
            otherDeclaredTags: [...declared].filter((other) => other !== tag),
            status: !file ? "file-unresolved" : declared.has(tag) ? "ok" : "missing",
        });
    }
    return entries;
};

const entries = packageDirs.flatMap(catalogEntriesOf);

/** File mode: decide whether the file is a web component and report each element in it. */
const inspectFile = (file) => {
    const source = readSource(file);
    const declared = declaredTagsOf(source);
    const catalogEntries = entries.filter((entry) => entry.absoluteFile === file);
    const result = { file: path.relative(repoRoot, file), absoluteFile: file, components: [], unregisteredClasses: [] };

    for (const cls of classesOf(source)) {
        const catalogEntry = catalogEntries.find((entry) => entry.className === cls.className);
        const tag = catalogEntry?.tag ?? cls.registeredTag;
        if (!tag) {
            result.unregisteredClasses.push({ className: cls.className, base: cls.base, abstract: cls.abstract });
            continue;
        }
        result.components.push({
            tag,
            className: cls.className,
            registeredBy: catalogEntry ? "iifeCatalog" : cls.registeredBy,
            decoratorTag: cls.registeredBy === "@customElement" ? cls.registeredTag : null,
            exported: cls.exported,
            abstract: cls.abstract,
            declared: declared.has(tag),
            status: declared.has(tag) ? "ok" : "missing",
        });
    }
    result.otherDeclaredTags = [...declared].filter((tag) => !result.components.some((component) => component.tag === tag));
    result.isWebComponent = result.components.length > 0;
    return result;
};

if (queryFile) {
    const report = inspectFile(queryFile);
    if (asJson) {
        console.log(JSON.stringify(report, null, 2));
    } else if (!report.isWebComponent) {
        console.log(`NOT A WEB COMPONENT  ${report.file}`);
        console.log("No class in this file is registered as a custom element (no catalog entry, @customElement or customElements.define).");
        for (const cls of report.unregisteredClasses) {
            console.log(`         unregistered class: ${cls.className} extends ${cls.base}${cls.abstract ? " (abstract)" : ""}`);
        }
    } else {
        for (const component of report.components) {
            const mark = component.status === "ok" ? "OK     " : "MISSING";
            console.log(`${mark}  ${component.tag}  ->  ${component.className}  (${report.file}; via ${component.registeredBy})`);
            if (component.decoratorTag && component.decoratorTag !== component.tag) {
                console.log(`         note: @customElement("${component.decoratorTag}") differs from the catalog tag`);
            }
            if (!component.exported) {
                console.log("         note: the class is not exported from this file");
            }
            if (component.abstract) {
                console.log("         note: the class is abstract; do not declare it");
            }
        }
        for (const tag of report.otherDeclaredTags) {
            console.log(`         note: declares "${tag}" which no class in this file registers`);
        }
    }
    process.exit(report.isWebComponent ? 0 : 2);
}

const matchesQuery = (entry) => {
    if (!query) {
        return true;
    }
    const needle = query.toLowerCase();
    return entry.tag.toLowerCase() === needle
        || entry.className.toLowerCase() === needle
        || (entry.file ? path.basename(entry.file, ".ts").toLowerCase() === path.basename(needle, ".ts").toLowerCase() : false);
};

let selected = entries.filter(matchesQuery);
if (onlyMissing) {
    selected = selected.filter((entry) => entry.status !== "ok");
}

if (asJson) {
    console.log(JSON.stringify(selected, null, 2));
    process.exit(selected.length === 0 ? 1 : 0);
}

if (selected.length === 0) {
    console.log(query ? `No catalog entry matches "${query}".` : "No catalog entries found.");
    console.log("The component may be registered with @customElement() instead, or not catalogued at all. Pass its file path to inspect it directly.");
    process.exit(1);
}

for (const entry of selected) {
    const mark = entry.status === "ok" ? "OK     " : entry.status === "missing" ? "MISSING" : "UNKNOWN";
    console.log(`${mark}  ${entry.tag}  ->  ${entry.className}  (${entry.file ?? entry.specifier ?? "unresolved"})`);
    if (entry.decoratorTag && entry.decoratorTag !== entry.tag) {
        console.log(`         note: @customElement("${entry.decoratorTag}") differs from the catalog tag`);
    }
    if (!entry.exportsClass && entry.file) {
        console.log("         note: the class is not exported from that file under this name");
    }
}

if (!query) {
    const missing = entries.filter((entry) => entry.status !== "ok").length;
    console.log(`\n${entries.length} catalog entries, ${missing} without a matching declaration.`);
}
