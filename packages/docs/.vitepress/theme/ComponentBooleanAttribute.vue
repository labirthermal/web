<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'

const props = defineProps<{
    name: string
    tag: string
}>()

const example = computed(() => [
    `<!-- ${props.name} is true in all of these cases: -->`,
    `<${props.tag} ${props.name}>Example</${props.tag}>`,
    `<${props.tag} ${props.name}="">Example</${props.tag}>`,
    `<${props.tag} ${props.name}="true">Example</${props.tag}>`,
    `<${props.tag} ${props.name}="false">Example</${props.tag}>`,
    `<${props.tag} ${props.name}="anything">Example</${props.tag}>`,
    '',
    `<!-- ${props.name} is false only when the attribute is missing: -->`,
    `<${props.tag}>Example</${props.tag}>`,
].join('\n'))
</script>

<template>
    <div class="component-boolean-attribute">
        <p class="component-boolean-attribute__note">
            (if <code>{{ name }}</code> is present, its value is <code>true</code>.
            If it is missing, its value is <code>false</code>.
            <a :href="withBase('/webcomponents/guide/boolean-attributes.html')">More info</a>.)
        </p>
        <details>
            <summary>Boolean attribute HTML examples</summary>
            <div class="language-html">
                <pre><code>{{ example }}</code></pre>
            </div>
        </details>
    </div>
</template>

<style scoped>
.component-boolean-attribute {
    margin: 8px 0 16px;
    color: var(--vp-c-text-2);
    font-size: 13px;
}

.component-boolean-attribute__note {
    margin: 0 0 8px;
    line-height: 1.6;
}

summary {
    width: fit-content;
    cursor: pointer;
}
</style>
