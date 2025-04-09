<script setup lang="ts">
import { useDataTableRow } from '../composables/use-data-table-row';

const { row } = useDataTableRow();

const onChange = (value: boolean) => {
    if (value) {
        row.value.select()
    } else {
        row.value.unselect();
    }
}
</script>
<template>
    <slot
        :value="row.isSelected"
        :onChange="onChange"
        :onToggle="row.toggleSelect"
        :select="row.select"
        :unselect="row.unselect"
    />
</template>