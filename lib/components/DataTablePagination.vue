<script setup lang="ts" generic="D">
import { useDataTable } from '../composables/use-data-table';

const { from, to, total, totalPages, setPage, setPerPage, pagination, hasNextPage, hasPrevPage } = useDataTable();

const onNext = () => {
    setPage(pagination.value.page + 1);
}
const onPrev = () => {
    setPage(pagination.value.page - 1);
}
const onLast = () => {
    setPage(totalPages.value);
}
const onFirst = () => {
    setPage(1);
}
</script>
<template>
    <slot
        :from="from"
        :to="to"
        :total="total"
        :totalPages="totalPages"
        :onPageChange="setPage"
        :onPerPageChange="setPerPage"
        :page="pagination.page"
        :perPage="pagination.perPage"
        :hasNextPage="hasNextPage"
        :hasPrevPage="hasPrevPage"
        :onNext="onNext"
        :onPrev="onPrev"
        :onLast="onLast"
        :onFirst="onFirst"
    />
</template>