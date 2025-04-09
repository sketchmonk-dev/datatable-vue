<script setup lang="ts">
import { useDataTable } from '../composables/use-data-table';

const { rows } = useDataTable();
</script>
<template>
    <slot
        v-if="rows.length"
        :rows="rows"
    />
    <slot v-else name="empty" />
</template>