import { createApp, type App } from 'vue'
import HierarchyLabel, { type HierarchyDefaults } from './HierarchyLabel.vue'

/**
 * Attributes tracked in provider labels, keyed by a CSS selector matching the provider.
 * Each attribute maps to the value displayed while the provider has none; `null` means no default.
 */
export type HierarchyTracking = Record<string, HierarchyDefaults>

/** Watched attributes as a comma separated list, an array, or an object mapping them to defaults. */
export type HierarchyWatch = string | string[] | HierarchyDefaults

// Force HTML attributes so Lit converters receive strings instead of Vue assigning properties.
export function htmlAttributes(attrs: Record<string, unknown>): Record<string, unknown> {
    return Object.fromEntries(Object.entries(attrs).map(([name, value]) =>
        name === 'class' || name === 'style' || /^on[A-Z]/.test(name) ? [name, value] : [`^${name}`, value]))
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
