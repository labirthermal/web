<script setup lang="ts">
withDefaults(defineProps<{
    tag: string
    category?: string
    requires?: string[]
}>(), {
    requires: () => [],
})
</script>

<template>
    <div class="component-info">
        <dl class="component-info__meta">
            <dt>Tag</dt>
            <dd><code>&lt;{{ tag }}&gt;</code></dd>

            <template v-if="category">
                <dt>Category</dt>
                <dd>{{ category }}</dd>
            </template>

            <template v-if="requires.length">
                <dt>Must be placed inside</dt>
                <dd>
                    <template v-for="(parent, index) in requires" :key="parent">
                        <code>&lt;{{ parent }}&gt;</code><span v-if="index < requires.length - 1">, </span>
                    </template>
                </dd>
            </template>
        </dl>

        <div v-if="$slots.default" class="component-info__description">
            <slot />
        </div>
    </div>
</template>

<style scoped>
.component-info__meta {
    display: grid;
    grid-template-columns: max-content 1fr;
    gap: 6px 24px;
    margin: 16px 0;
}

.component-info__meta dt {
    color: var(--vp-c-text-2);
    font-weight: 500;
}

.component-info__meta dd {
    margin: 0;
}
</style>
