<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

export type HierarchyDefaults = Record<string, string | number | boolean | null>

const props = defineProps<{
    /** The provider element whose attributes are displayed. */
    element: HTMLElement
    /** Displayed attributes mapped to the value displayed while the element has none. */
    tracked: HierarchyDefaults
}>()

type LitHost = HTMLElement & {
    addController?: (controller: { hostUpdated?: () => void }) => void
    removeController?: (controller: { hostUpdated?: () => void }) => void
}

// Incremented whenever the element changes so that computed values re-read it.
const revision = ref(0)
const refresh = () => revision.value++
const controller = { hostUpdated: refresh }
// The attribute being edited keeps its text frozen so live updates do not overwrite the typing.
const editing = ref<{ name: string, value: string }>()
let observer: MutationObserver | undefined
let connected = false
const bare = ref(false)

type PropertyOptions = { attribute?: string | boolean, type?: unknown }

/** Maps an HTML attribute to the reactive Lit property that holds its current value. */
const propertyOf = (attribute: string): { name: string, options: PropertyOptions } | undefined => {
    const properties: Map<string, PropertyOptions> | undefined =
        (props.element.constructor as { elementProperties?: Map<string, PropertyOptions> }).elementProperties
    if (!properties) {
        return undefined
    }
    for (const [name, options] of properties) {
        const mapped = typeof options.attribute === 'string' ? options.attribute : name.toLowerCase()
        if (options.attribute !== false && mapped === attribute) {
            return { name, options }
        }
    }
    return undefined
}

// Boolean attributes follow the Lit standard: present means `true`, absent means `false`.
// A boolean fallback marks the attribute as boolean even before the element is defined.
const isBoolean = (attribute: string, fallback: unknown): boolean =>
    propertyOf(attribute)?.options.type === Boolean || typeof fallback === 'boolean'

const readBoolean = (attribute: string): boolean => {
    const property = propertyOf(attribute)
    return property !== undefined
        ? Boolean((props.element as unknown as Record<string, unknown>)[property.name])
        : props.element.hasAttribute(attribute)
}

const readValue = (attribute: string): string | undefined => {
    const property = propertyOf(attribute)?.name
    const value = property !== undefined
        ? (props.element as unknown as Record<string, unknown>)[property]
        : props.element.getAttribute(attribute)
    if (value === undefined || value === null || value === '') {
        return undefined
    }
    return typeof value === 'object' ? JSON.stringify(value) : String(value)
}

const rows = computed(() => {
    revision.value
    return Object.entries(props.tracked).flatMap(([name, fallback]) => {
        // Boolean attribute: shown as a bare name when true, hidden when false
        if (isBoolean(name, fallback)) {
            return readBoolean(name) ? [{ name, value: '', isDefault: false, isBoolean: true }] : []
        }

        // Valued attribute: the edited text, the current value or the fallback
        if (editing.value?.name === name) {
            return [{ name, value: editing.value.value, isDefault: false, isBoolean: false }]
        }
        const value = readValue(name)
        return [{
            name,
            value: value ?? (fallback === null || fallback === undefined ? '' : String(fallback)),
            isDefault: value === undefined,
            isBoolean: false,
        }]
    })
})

const commit = (name: string, event: Event) => {
    const target = event.target as HTMLElement
    const value = target.textContent?.trim() ?? ''
    const original = editing.value?.value
    editing.value = undefined
    // Comparing with the original text keeps an untouched default value out of the markup.
    if (value !== original) {
        if (value === '') {
            props.element.removeAttribute(name)
        } else {
            props.element.setAttribute(name, value)
        }
    }
    // Restore the rendered text in case the element rejected or normalised the value.
    refresh()
    target.textContent = rows.value.find(row => row.name === name)?.value ?? ''
}

const onKeydown = (event: KeyboardEvent) => {
    const target = event.target as HTMLElement
    if (event.key === 'Enter') {
        event.preventDefault()
        target.blur()
    } else if (event.key === 'Escape') {
        target.textContent = editing.value?.value ?? ''
        target.blur()
    }
}

onMounted(() => {
    connected = true
    bare.value = props.element.closest('.hierarchy')?.classList.contains('bare') ?? false
    observer = new MutationObserver(refresh)
    observer.observe(props.element, { attributes: true })
    customElements.whenDefined(props.element.localName).then(() => {
        if (connected) {
            (props.element as LitHost).addController?.(controller)
            refresh()
        }
    })
})

onBeforeUnmount(() => {
    connected = false
    const host = props.element as LitHost
    host.removeController?.(controller)
    observer?.disconnect()
})
</script>

<template>
    <span class="hierarchy-label__tag">{{ bare ? '' : '<' }}{{ element.localName }}</span>
    <template v-for="row in rows" :key="row.name">
        <span v-if="row.isBoolean" class="hierarchy-label__attribute">{{ row.name }}</span>
        <span v-else class="hierarchy-label__attribute">{{ row.name }}="<span
                class="hierarchy-label__value"
                :class="{ 'hierarchy-label__value--default': row.isDefault }"
                :data-name="row.name"
                :title="row.isDefault ? 'Default value – click to edit' : 'Click to edit'"
                contenteditable="plaintext-only"
                spellcheck="false"
                @focus="editing = { name: row.name, value: row.value }"
                @keydown="onKeydown"
                @blur="commit(row.name, $event)"
            >{{ row.value }}</span>"</span>
    </template>
    <span v-if="!bare" class="hierarchy-label__tag">></span>
</template>
