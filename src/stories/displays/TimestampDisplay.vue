<script setup lang="ts">
defineProps<{
    timestamp: string; // ISO 8601 format
}>();
</script>
<template>
    <div class="timestamp-display">
        <span>
            📅
        </span>
        {{ new Date(timestamp).toLocaleString() }}
    </div>
</template>
<style lang="css" scoped>
.timestamp-display {
    display: flex;
    align-items: center;
    gap: 8px;
}
</style>