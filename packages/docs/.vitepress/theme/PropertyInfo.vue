<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
    /** Name of the class handling the property, e.g. "TimelineDrive" */
    handler: string
    /** Data type of the property value, e.g. "number" */
    type?: string
    /** Path to the source file relative to the repository root */
    source?: string
}>(), {})

const githubUrl = computed(() => props.source
    ? `https://github.com/labirthermal/web/blob/main/${props.source}`
    : undefined
)
</script>

<template>
    <div class="property-info">
        <dl class="property-info__meta">
            <dt>Handled by</dt>
            <dd>
                <a v-if="githubUrl" :href="githubUrl" target="_blank" rel="noopener">
                    <code>{{ handler }}</code>
                </a>
                <code v-else>{{ handler }}</code>
            </dd>

            <template v-if="type">
                <dt>Value type</dt>
                <dd><code>{{ type }}</code></dd>
            </template>

            <template v-if="githubUrl">
                <dt>Source</dt>
                <dd><a :href="githubUrl" target="_blank" rel="noopener">{{ source }}</a></dd>
            </template>
        </dl>

        <div v-if="$slots.default" class="property-info__description">
            <slot />
        </div>
    </div>
</template>

<style scoped>
.property-info__meta {
    display: grid;
    grid-template-columns: max-content 1fr;
    gap: 6px 24px;
    margin: 16px 0;
}

.property-info__meta dt {
    color: var(--vp-c-text-2);
    font-weight: 500;
}

.property-info__meta dd {
    margin: 0;
    overflow-wrap: anywhere;
}
</style>
