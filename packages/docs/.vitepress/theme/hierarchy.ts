import { createApp, type App } from 'vue'
import { withBase } from 'vitepress'
import HierarchyLabel, { type HierarchyDefaults } from './HierarchyLabel.vue'

// Asset URLs: documentation shows site-root paths such as `/files/husy.lrc`, while live previews
// always resolve them through `withBase()` so they load under the deployed base (e.g. `/web/`).
// Only root-relative paths are rewritten; absolute URLs, protocol-relative URLs and relative paths stay as written.
const ASSET_ATTRIBUTE_NAMES = ['thermal', 'visible', 'src', 'href', 'poster']
const ASSET_ATTRIBUTES = new RegExp(`\\b(${ASSET_ATTRIBUTE_NAMES.join('|')})="(\\/(?!\\/)[^"]*)"`, 'g')

/** Prefixes a root-relative path with the VitePress base, unless it already contains it. */
export function resolveAsset(path: string): string {
    if (!path.startsWith('/') || path.startsWith('//')) {
        return path
    }
    const base = withBase('/')
    return base !== '/' && path.startsWith(base) ? path : withBase(path)
}

/** Resolves the asset attributes of an HTML source; used for `ComponentExample` previews. */
export function withBaseAssets(source: string): string {
    return source.replace(ASSET_ATTRIBUTES, (_, name: string, path: string) => `${name}="${resolveAsset(path)}"`)
}

/**
 * Attributes tracked in provider labels, keyed by a CSS selector matching the provider.
 * Each attribute maps to the value displayed while the provider has none; `null` means no default.
 */
export type HierarchyTracking = Record<string, HierarchyDefaults>

/** Watched attributes as a comma separated list, an array, or an object mapping them to defaults. */
export type HierarchyWatch = string | string[] | HierarchyDefaults

// Force HTML attributes so Lit converters receive strings instead of Vue assigning properties.
// Asset attributes are resolved against the VitePress base.
export function htmlAttributes(attrs: Record<string, unknown>): Record<string, unknown> {
    return Object.fromEntries(Object.entries(attrs).map(([name, value]) => {
        if (name === 'class' || name === 'style' || /^on[A-Z]/.test(name)) {
            return [name, value]
        }
        const resolved = ASSET_ATTRIBUTE_NAMES.includes(name) && typeof value === 'string' ? resolveAsset(value) : value
        return [`^${name}`, resolved]
    }))
}

export function normalizeWatch(watch: HierarchyWatch | undefined): HierarchyDefaults {
    if (watch === undefined) {
        return {}
    }
    if (typeof watch === 'string' || Array.isArray(watch)) {
        const names = typeof watch === 'string' ? watch.split(',') : watch
        return Object.fromEntries(names.map(name => name.trim()).filter(Boolean).map(name => [name, null]))
    }
    return watch
}

const PROVIDERS = 'manager-provider, registry-provider, group-provider, file-provider'
const IGNORED_ATTRIBUTES = /^(class|style|id|data-.*)$/

const labelled = new WeakSet<HTMLElement>()

/** Lists the attributes written on each provider of the container, in document order. */
export function authoredAttributes(hierarchy: ParentNode): string[][] {
    return [...hierarchy.querySelectorAll(PROVIDERS)].map(element => element.getAttributeNames()
        .filter(name => !IGNORED_ATTRIBUTES.test(name)))
}

/**
 * Mounts a live, editable `HierarchyLabel` into every provider of the given `.hierarchy` container.
 * Each label shows the tracked attributes followed by the authored ones, which default to the
 * attributes present right now. Pass them explicitly when the providers may already have
 * reflected their internal state into attributes. Returns a function unmounting the labels again.
 */
export function mountHierarchyLabels(
    hierarchy: HTMLElement,
    tracking: HierarchyTracking = {},
    authored: string[][] = authoredAttributes(hierarchy),
): () => void {
    const labels: { app: App, container: HTMLElement, element: HTMLElement }[] = []

    hierarchy.querySelectorAll<HTMLElement>(PROVIDERS).forEach((element, index) => {
        // Skips providers already labelled, including those rendered by `HierarchyProvider`.
        if (labelled.has(element) || element.querySelector(':scope > .hierarchy-label')) {
            return
        }
        labelled.add(element)

        const tracked = Object.assign({}, ...Object.entries(tracking)
            .filter(([selector]) => element.matches(selector))
            .map(([, defaults]) => defaults)) as HierarchyDefaults
        for (const name of authored[index] ?? []) {
            if (!(name in tracked)) {
                tracked[name] = null
            }
        }

        const container = document.createElement('div')
        container.className = 'hierarchy-label'
        element.prepend(container)

        const app = createApp(HierarchyLabel, {
            element,
            tracked,
        })
        app.mount(container)
        labels.push({ app, container, element })
    })

    return () => labels.forEach(({ app, container, element }) => {
        app.unmount()
        container.remove()
        labelled.delete(element)
    })
}
