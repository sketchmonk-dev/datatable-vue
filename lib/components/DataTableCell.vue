<script setup lang="ts" generic="D, M=any">
import { computed } from 'vue';
import type { DataTableCellInfo } from '../common';
import { useProvideDataTableCell, useProvideDataTableColumn } from '../composables';

const props = defineProps<{
    cell: DataTableCellInfo<D, M>;
}>();

const cell = computed(() => props.cell);
useProvideDataTableCell(cell);

const column = computed(() => props.cell.column);
useProvideDataTableColumn(column);
</script>
<template>
    <slot v-bind="cell" />
</template>