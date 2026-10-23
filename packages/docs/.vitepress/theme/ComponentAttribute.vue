<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
    name: string
    type?: string
    default?: string
}>()

const id = computed(() => props.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'))
</script>

<template>
    <div class="component-attribute">
        <h3 :id="id">
            <code>{{ name }}</code>
            <a class="header-anchor" :href="`#${id}`" :aria-label="`Permalink to ${name}`">&#8203;</a>
        </h3>

        <p v-if="type || props.default !== undefined" class="component-attribute__meta">
            <span v-if="type">Type: <code>{{ type }}</code></span>
            <span v-if="props.default !== undefined">Default: <code>{{ props.default }}</code></span>
        </p>

        <slot />
    </div>
</template>

<style scoped>
.component-attribute__meta {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 24px;
    margin: 8px 0 16px;
    color: var(--vp-c-text-2);
    font-size: 14px;
}
</style>
