<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { mountHierarchyLabels, type HierarchyTracking } from './hierarchy'

// Raw provider elements in the slot get labels automatically; `HierarchyManager`,
// `HierarchyRegistry`, `HierarchyGroup` and `HierarchyFile` render their own.

const props = defineProps<{
    /** Attributes tracked in the provider labels, see `HierarchyTracking`. */
    track?: HierarchyTracking
    /** Hides the angle brackets around the provider tag names. */
    bare?: boolean
}>()

const root = ref<HTMLElement>()
let unmount: (() => void) | undefined

onMounted(() => {
    if (root.value) {
        unmount = mountHierarchyLabels(root.value, props.track)
    }
})

onBeforeUnmount(() => unmount?.())
</script>

<template>
    <div ref="root" class="hierarchy" :class="{ bare }">
        <slot />
    </div>
</template>
