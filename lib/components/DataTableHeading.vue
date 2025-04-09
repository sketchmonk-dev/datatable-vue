<script setup lang="ts" generic="D, M=any">
import { computed } from 'vue';
import type { DataTableColumnInfo } from '../common';
import { useProvideDataTableColumn } from '../composables';

const props = defineProps<{
    column: DataTableColumnInfo<D, M>;
}>();

const column = computed(() => props.column);
useProvideDataTableColumn(column);
</script>
<template>
    <slot v-bind="column" />
</template>