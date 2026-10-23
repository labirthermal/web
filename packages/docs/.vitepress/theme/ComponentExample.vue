<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { authoredAttributes, mountHierarchyLabels, type HierarchyTracking } from './hierarchy'

const props = defineProps<{
    title?: string
    /** Attributes tracked in the provider labels of `.hierarchy` previews, see `HierarchyTracking`. */
    hierarchy?: HierarchyTracking
}>()

const source = ref<HTMLElement>()
const preview = ref<HTMLElement>()
const html = ref('')
const unmounts: (() => void)[] = []

// The code block rendered by markdown is the single source of truth for the live preview.
onMounted(async () => {
    const code = source.value?.querySelector('.language-html pre code')
    if (!code) {
        throw new Error('ComponentExample requires an HTML code block.')
    }
    html.value = code.textContent ?? ''

    // Lit reflects internal state into attributes right after rendering, so the authored
    // attributes are read from an inert copy of the source instead of the live preview.
    const template = document.createElement('template')
    template.innerHTML = html.value
    const authored = [...template.content.querySelectorAll('.hierarchy')].map(authoredAttributes)

    await nextTick()
    preview.value?.querySelectorAll<HTMLElement>('.hierarchy').forEach((hierarchy, index) => {
        unmounts.push(mountHierarchyLabels(hierarchy, props.hierarchy, authored[index]))
    })
})

onBeforeUnmount(() => unmounts.forEach(unmount => unmount()))
</script>

<template>
    <div class="component-example">
        <p v-if="title" class="component-example__title">{{ title }}</p>
        <div class="component-example__body">
            <div ref="source" class="component-example__code">
                <slot />
            </div>
            <div ref="preview" class="component-example__preview" v-html="html" />
        </div>
    </div>
</template>

<style scoped>
.component-example {
    margin: 16px 0 24px;
}

.component-example__title {
    margin: 0 0 8px;
    font-weight: 500;
}

.component-example__body {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.component-example__code :deep(div[class*='language-']) {
    margin: 0;
}

.component-example__preview {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    padding: 20px 24px;
    border: 1px solid var(--vp-c-divider);
    border-radius: 8px;
    background-color: var(--vp-code-block-bg);
}

@media (max-width: 639px) {
    .component-example__code :deep(div[class*='language-']),
    .component-example__preview {
        border-radius: 0;
        margin: 0 -24px;
    }

    .component-example__preview {
        border-width: 1px 0;
    }
}
</style>
