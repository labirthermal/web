<script setup lang="ts">
import { computed, h, type FunctionalComponent } from 'vue'

export type WebcomponentTableItem = string | {
    tag: string
    /** Short description displayed in its own column. */
    description?: string
    /** HTML attributes of the previewed element. */
    attrs?: Record<string, string | number | boolean>
    /** Link of the tag name, e.g. to the component's own page. */
    link?: string
}

const props = withDefaults(defineProps<{
    /** Tags as a comma separated list, or an array of tags and item objects. */
    components: string | WebcomponentTableItem[]
    /** Optional caption above the table. */
    title?: string
    /** Renders a live preview of every component. Previews need the matching context providers around the table. */
    preview?: boolean
}>(), { preview: true })

const items = computed(() => {
    const list = typeof props.components === 'string' ? props.components.split(',') : props.components
    return list
        .map(item => typeof item === 'string' ? { tag: item.trim() } : item)
        .filter(item => item.tag)
})

const hasDescription = computed(() => items.value.some(item => item.description))

// Custom elements are created directly, with all values forced into HTML attributes for Lit to convert.
const Preview: FunctionalComponent<{ tag: string, attrs?: Record<string, unknown> }> = ({ tag, attrs }) =>
    h(tag, Object.fromEntries(Object.entries(attrs ?? {}).map(([name, value]) => [`^${name}`, value])))
</script>

<template>
    <table class="webcomponent-table">
        <caption v-if="title">{{ title }}</caption>
        <thead>
            <tr>
                <th>Webcomponent</th>
                <th v-if="hasDescription">Description</th>
                <th v-if="preview">Preview</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in items" :key="item.tag">
                <td>
                    <a v-if="item.link" :href="item.link"><code>&lt;{{ item.tag }}&gt;</code></a>
                    <code v-else>&lt;{{ item.tag }}&gt;</code>
                </td>
                <td v-if="hasDescription">{{ item.description }}</td>
                <td v-if="preview">
                    <Preview :tag="item.tag" :attrs="item.attrs" />
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
.webcomponent-table {
    display: table;
    width: 100%;
    margin: 0 0 1rem;
}

.webcomponent-table caption {
    caption-side: top;
    text-align: left;
    font-weight: 600;
    padding-bottom: 0.5rem;
}

.webcomponent-table td:first-child code {
    white-space: nowrap;
}
</style>
