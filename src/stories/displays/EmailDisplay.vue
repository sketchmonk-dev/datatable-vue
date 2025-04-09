<script setup lang="ts">
defineProps<{
    email: string;
}>();
</script>
<template>
    <a :href="`mailto://${email}`" class="email-display">
        <span>
            ✉️
        </span>
        {{ email }}
    </a>
</template>
<style lang="css" scoped>
.email-display {
    display: flex;
    align-items: center;
    gap: 8px;
    color: inherit;
    text-decoration: none;
    opacity: 0.8;
    cursor: pointer;
}

.email-display:hover {
    opacity: 1;
}
</style>