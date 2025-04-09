<script setup lang="ts">
defineProps<{
    text: string;
}>();
</script>
<template>
    <span :title="text" class="text-display">
        {{ text }}
    </span>
</template>
<style lang="css" scoped>
.text-display {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>