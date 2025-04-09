<script setup lang="ts" generic="D">
import { computed } from "vue";
import type {
  DataTableFilterState,
  DataTableColumnDef,
  DataTableSortState,
  DataTablePaginationState,
  IdentityFn,
  DataTableOptions,
} from "../common";
import { useProvideDataTable } from "../composables/use-data-table";

const props = defineProps<{
  columns: DataTableColumnDef<D>[];
  total: number;
  data: D[];
  identity: IdentityFn<D>;
}>();

const columns = computed(() => props.columns);
const data = computed(() => props.data);
const total = computed(() => props.total);
const options = computed<DataTableOptions<D>>(() => {
  return {
    identity: props.identity,
  };
});

const filters = defineModel<DataTableFilterState>('filters', {
  default: () => ({}),
});
const sort = defineModel<DataTableSortState | null>('sort', {
  default: null,
});
const pagination = defineModel<DataTablePaginationState>('pagination', {
  default: () => ({
    page: 1,
    perPage: 10,
  }),
});

const selection = defineModel<D[]>('selection', {
  default: () => [],
});

useProvideDataTable<D>(
  data,
  total,
  columns,
  { filters, sort, pagination },
  selection,
  options
);
</script>
<template>
  <slot />
</template>
