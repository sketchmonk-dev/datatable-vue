<script setup lang="ts">
import { useDataTable } from '../composables/use-data-table';

const { columns } = useDataTable();

</script>
<template>
    <slot
        :columns="columns"
    />
</template>