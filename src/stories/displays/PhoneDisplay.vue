<script setup lang="ts">
defineProps<{
    phone: string;
}>();
</script>
<template>
    <a :href="`tel://${phone}`" class="phone-display">
        <span>
            📞
        </span>
        {{ phone }}
    </a>
</template>
<style lang="css" scoped>
.phone-display {
    display: flex;
    align-items: center;
    gap: 8px;
    color: inherit;
    text-decoration: none;
    opacity: 0.8;
    cursor: pointer;
}

.phone-display:hover {
    opacity: 1;
}
</style>