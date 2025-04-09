<script setup lang="ts" generic="D">
import { computed } from 'vue';
import type { DataTableRowInfo } from '../common';
import { useProvideDataTableRow } from '../composables/use-data-table-row';

const props = defineProps<{
    row: DataTableRowInfo<D>;
}>();

const row = computed(() => props.row);
const { cells } = useProvideDataTableRow(row);
</script>
<template>
    <slot v-bind="row" :cells="cells" />
</template>