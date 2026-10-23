<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import HierarchyLabel from './HierarchyLabel.vue'
import { htmlAttributes, normalizeWatch, type HierarchyWatch } from './hierarchy'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
    tag: 'manager-provider' | 'registry-provider' | 'group-provider' | 'file-provider'
    /**
     * Attributes displayed in the label, either as a list (`"from, to"` or `['from', 'to']`)
     * or as an object mapping each attribute to the value displayed while the provider has none.
     */
    watch?: HierarchyWatch
}>()

const attrs = useAttrs()
const element = ref<HTMLElement>()
const tracked = computed(() => normalizeWatch(props.watch))

const attributes = computed(() => htmlAttributes(attrs))
</script>

<template>
    <component :is="tag" ref="element" v-bind="attributes">
        <div class="hierarchy-label">
            <HierarchyLabel v-if="element" :element="element" :tracked="tracked" />
        </div>
        <slot />
    </component>
</template>
