<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import HierarchyLabel from './HierarchyLabel.vue'
import { htmlAttributes, normalizeWatch, type HierarchyWatch } from './hierarchy'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{
    /** Custom element displayed with an external label, even when it has no slot. */
    tag?: string
    /** Same editable attribute list or defaults mapping as `HierarchyProvider`. */
    watch?: HierarchyWatch
}>(), {
    tag: 'thermal-file-app',
})

const attrs = useAttrs()
const element = ref<HTMLElement>()
const tracked = computed(() => normalizeWatch(props.watch))
const attributes = computed(() => htmlAttributes(attrs))
</script>

<template>
    <div class="hierarchy-app">
        <div class="hierarchy-label">
            <HierarchyLabel v-if="element" :element="element" :tracked="tracked" />
        </div>
        <component :is="tag" ref="element" v-bind="attributes">
            <slot />
        </component>
    </div>
</template>
