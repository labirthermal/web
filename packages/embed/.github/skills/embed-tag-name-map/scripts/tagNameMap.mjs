#!/usr/bin/env node
/**
 * Resolves the `iifeCatalog.ts` tag <-> class <-> file mapping of
 * `@labirthermal/webcomponents` and reports the `HTMLElementTagNameMap`
 * declaration status of every catalogued component.
 *
 * Usage (run from anywhere):
 *   node <skill>/scripts/tagNameMap.mjs                  # all entries
 *   node <skill>/scripts/tagNameMap.mjs --missing        # only entries without a declaration
 *   node <skill>/scripts/tagNameMap.mjs <query>          # one entry by tag, class name or file path
 *   node <skill>/scripts/tagNameMap.mjs <query> --json   # machine readable output
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const skillDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const packageDir = path.resolve(skillDir, "../../..");
const srcDir = path.join(packageDir, "src");
const catalogPath = path.join(srcDir, "iifeCatalog.ts");

if (!fs.existsSync(catalogPath)) {
    console.error(`Catalog not found at ${catalogPath}`);
    process.exit(1);
}

const catalogSource = fs.readFileSync(catalogPath, "utf8");

/** className -> module specifier, collected from the catalog imports. */
const importsByClass = new Map();
const importPattern = /import\s*\{\s*([^}]+?)\s*\}\s*from\s*["']([^"']+)["']/g;

for (const match of catalogSource.matchAll(importPattern)) {
    const specifier = match[2];
    for (const rawName of match[1].split(",")) {
        const name = rawName.replace(/^type\s+/, "").split(/\s+as\s+/).pop().trim();
        if (name) {
            importsByClass.set(name, specifier);
        }
    }
}

/** Every `"tag": ClassName` pair of every catalog group, in catalog order. */
const entryPattern = /^\s*["']([a-z][a-z0-9]*(?:-[a-z0-9]+)+)["']\s*:\s*([A-Za-z_$][\w$]*)\s*,?\s*$/gm;

const resolveFile = (specifier) => {
    if (!specifier.startsWith(".")) {
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
    const blockPattern = /interface\s+HTMLElementTagNameMap\s*\{([\s\S]*?)\}/g;
    for (const block of source.matchAll(blockPattern)) {
        for (const line of block[1].matchAll(/["']([^"']+)["']\s*:/g)) {
            tags.add(line[1]);
        }
    }
    return tags;
};

const sourceCache = new Map();
const readSource = (file) => {
    if (!sourceCache.has(file)) {
        sourceCache.set(file, fs.readFileSync(file, "utf8"));
    }
    return sourceCache.get(file);
};

const entries = [];
const seenTags = new Set();

for (const match of catalogSource.matchAll(entryPattern)) {
    const [, tag, className] = match;
    if (seenTags.has(tag)) {
        continue;
    }
    seenTags.add(tag);

    const specifier = importsByClass.get(className) ?? null;
    const file = specifier ? resolveFile(specifier) : null;
    const source = file ? readSource(file) : null;

    const declaredTags = source ? declaredTagsOf(source) : new Set();
    const exportsClass = source
        ? new RegExp(`export\\s+(?:abstract\\s+)?class\\s+${className}\\b`).test(source)
        : false;
    const decoratorTag = source
        ? (source.match(new RegExp(`@customElement\\(\\s*["']([^"']+)["']\\s*\\)[\\s\\S]{0,400}?class\\s+${className}\\b`))?.[1] ?? null)
        : null;

    entries.push({
        tag,
        className,
        specifier,
        file: file ? path.relative(packageDir, file) : null,
        absoluteFile: file,
        exportsClass,
        decoratorTag,
        declared: declaredTags.has(tag),
        otherDeclaredTags: [...declaredTags].filter((declared) => declared !== tag),
        status: !file ? "file-unresolved" : declaredTags.has(tag) ? "ok" : "missing",
    });
}

const args = process.argv.slice(2);
const asJson = args.includes("--json");
const onlyMissing = args.includes("--missing");
const query = args.find((arg) => !arg.startsWith("--")) ?? null;

const matchesQuery = (entry) => {
    if (!query) {
        return true;
    }
    const needle = query.toLowerCase();
    return (
        entry.tag.toLowerCase() === needle ||
        entry.className.toLowerCase() === needle ||
        (entry.file ? entry.file.toLowerCase().endsWith(needle.replace(/^.*?packages\/embed\//, "")) : false) ||
        (entry.absoluteFile ? path.resolve(entry.absoluteFile) === path.resolve(needle) : false) ||
        (entry.file ? path.basename(entry.file, ".ts").toLowerCase() === path.basename(needle, ".ts").toLowerCase() : false)
    );
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
    console.log("The component may be registered with @customElement() instead, or not catalogued at all.");
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
