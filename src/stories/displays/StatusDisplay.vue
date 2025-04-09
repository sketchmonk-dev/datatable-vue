<script setup lang="ts">
defineProps<{
    status: 'online' | 'offline';
}>();
</script>
<template>
    <div
        :style="`--status-color: ${status === 'online' ? 'oklch(69.6% 0.17 162.48)' : 'oklch(70.4% 0.191 22.216)'}`"
        class="status-display">
        <div class="status-display__indicator"></div>
        <span class="status-display__text">
            {{ status === 'online' ? 'Online' : 'Offline' }}
        </span>
    </div>
</template>
<style lang="css" scoped>
.status-display {
    display: flex;
    align-items: center;
    gap: 8px;
}
.status-display__indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--status-color);
}

.status-display__text {
    color: var(--status-color);
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 600;
}
</style>