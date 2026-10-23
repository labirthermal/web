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

/** Maps an HTML attribute to the reactive Lit property that holds its current value. */
const propertyOf = (attribute: string): string | undefined => {
    const properties: Map<string, { attribute?: string | boolean }> | undefined =
        (props.element.constructor as { elementProperties?: Map<string, { attribute?: string | boolean }> }).elementProperties
    if (!properties) {
        return undefined
    }
    for (const [name, options] of properties) {
        const mapped = typeof options.attribute === 'string' ? options.attribute : name.toLowerCase()
        if (options.attribute !== false && mapped === attribute) {
            return name
        }
    }
    return undefined
}

const readValue = (attribute: string): string | undefined => {
    const property = propertyOf(attribute)
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
    return Object.entries(props.tracked).map(([name, fallback]) => {
        if (editing.value?.name === name) {
            return { name, value: editing.value.value, isDefault: false }
        }
        const value = readValue(name)
        return {
            name,
            value: value ?? (fallback === null || fallback === undefined ? '' : String(fallback)),
            isDefault: value === undefined,
        }
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
    <span v-for="row in rows" :key="row.name" class="hierarchy-label__attribute">{{ row.name }}="<span
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
    <span v-if="!bare" class="hierarchy-label__tag">></span>
</template>
