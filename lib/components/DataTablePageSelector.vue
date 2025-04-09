<script setup lang="ts">
import { computed } from 'vue';
import { useDataTable } from '../composables/use-data-table';

const { isAllSelected, isSomeSelected, toggleSelectAll, selectAll, unselectAll } = useDataTable();

const checked = computed<boolean>(() => {
  return isAllSelected.value || isSomeSelected.value;
});

const onChange = (value: boolean) => {
    if (value) {
        selectAll();
    } else {
        unselectAll();
    }
}
</script>
<template>
    <slot
        :checked="checked"
        :indeterminate="isSomeSelected && !isAllSelected"
        :onChange="onChange"
        :onToggle="toggleSelectAll"
        :isAllSelected="isAllSelected"
        :isSomeSelected="isSomeSelected"
        :selectAll="selectAll"
        :unselectAll="unselectAll"
    />
</template>