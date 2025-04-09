<script setup lang="ts">
import {
  DataTable,
  DataTableBody,
  DataTableCell,
  DataTableHeader,
  DataTableHeading,
  DataTablePageSelector,
  DataTablePagination,
  DataTableRow,
  DataTableRowSelector,
  type DataTablePaginationState,
} from "../../lib";
import { data } from "./data";
import { columns, type ColumnMeta } from "./columns";
import { computed, ref } from "vue";
import TimestampDisplay from "./displays/TimestampDisplay.vue";
import TextDisplay from "./displays/TextDisplay.vue";
import EmailDisplay from "./displays/EmailDisplay.vue";
import PhoneDisplay from "./displays/PhoneDisplay.vue";
import StatusDisplay from "./displays/StatusDisplay.vue";

const pagination = ref<DataTablePaginationState>({
  page: 1,
  perPage: 10,
});
const filters = ref({});
const sort = ref(null);
const selection = ref([]);

const total = computed(() => data.length);

const tableData = computed(() => {
  const start = (pagination.value.page - 1) * pagination.value.perPage;
  const end = start + pagination.value.perPage;
  return data.slice(start, end);
});
</script>
<template>
    <div class="table">
        <DataTable
          :columns="columns"
          :data="tableData"
          :total="total"
          v-model:pagination="pagination"
          v-model:filters="filters"
          v-model:sort="sort"
          v-model:selection="selection"
          :identity="(row) => row.id"
        >
          <table>
            <DataTableHeader v-slot="{ columns }">
              <thead class="table__head">
                <tr class="table__row">
                  <DataTablePageSelector v-slot="{ checked, indeterminate, onChange }">
                      <th class="table__heading">
                          <div class="table__select">
                              <input
                                  type="checkbox"
                                  :indeterminate="indeterminate"
                                  :checked="checked"
                                  @change="onChange(($event.target as HTMLInputElement).checked)"
                              />
                          </div>
                      </th>
                  </DataTablePageSelector>
                  <DataTableHeading
                    :column="column"
                    :key="column.key"
                    v-for="column in columns"
                  >
                    <th class="table__heading">
                      <div class="table__heading__inner">
                        <span class="table__heading__text">{{
                          column.def.title
                        }}</span>
                        <div class="table__heading__controls">
                            <button
                              @click="column.toggleSort()"
                              v-if="column.def.sortable"
                              class="table__heading__control"
                              :class="{ active: !!column.sort }"
                            >
                              <span v-if="column.sort === 'asc'">
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                >
                                  <path d="m3 16 4 4 4-4" />
                                  <path d="M7 20V4" />
                                  <path d="M11 4h4" />
                                  <path d="M11 8h7" />
                                  <path d="M11 12h10" />
                                </svg>
                              </span>
                              <span v-else-if="column.sort === 'desc'">
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                >
                                  <path d="m3 16 4 4 4-4" />
                                  <path d="M7 20V4" />
                                  <path d="M11 4h10" />
                                  <path d="M11 8h7" />
                                  <path d="M11 12h4" />
                                </svg>
                              </span>
                              <span v-else>
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                >
                                  <path d="m3 16 4 4 4-4" />
                                  <path d="M7 20V4" />
                                  <path d="m21 8-4-4-4 4" />
                                  <path d="M17 4v16" />
                                </svg>
                              </span>
                            </button>
                            <button
                              v-if="column.def.filterable"
                              class="table__heading__control"
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              >
                                <path d="M3 6h18" />
                                <path d="M7 12h10" />
                                <path d="M10 18h4" />
                              </svg>
                            </button>
                        </div>
                      </div>
                    </th>
                  </DataTableHeading>
                </tr>
              </thead>
            </DataTableHeader>
            <DataTableBody v-slot="{ rows }">
              <tbody class="table__body">
                <DataTableRow
                  :row="row"
                  v-for="row in rows"
                  :key="row.id"
                  v-slot="{ cells }"
                >
                  <tr class="table__row" :class="{ 'selected': row.isSelected }">
                      <td class="table__cell">
                          <DataTableRowSelector v-slot="{ value, onChange }">
                              <div class="table__select">
                                  <input
                                      type="checkbox"
                                      :checked="value"
                                      @change="onChange(($event.target as HTMLInputElement).checked)"
                                  />
                              </div>
                          </DataTableRowSelector>
                      </td>
                    <DataTableCell
                      :cell="cell"
                      v-for="cell in cells"
                      :key="cell.column.key"
                    >
                      <td class="table__cell">
                        <TimestampDisplay :timestamp="cell.value" v-if="(cell.column.def.meta as ColumnMeta).display?.type === 'timestamp'" />
                        <EmailDisplay :email="cell.value" v-else-if="(cell.column.def.meta as ColumnMeta).display?.type === 'email'" />
                        <PhoneDisplay :phone="cell.value" v-else-if="(cell.column.def.meta as ColumnMeta).display?.type === 'phone'" />
                        <StatusDisplay :status="cell.value ? 'online' : 'offline'" v-else-if="(cell.column.def.meta as ColumnMeta).display?.type === 'status'" />
                        <TextDisplay :text="cell.value" v-else />
                      </td>
                    </DataTableCell>
                  </tr>
                </DataTableRow>
              </tbody>
            </DataTableBody>
          </table>
          <DataTablePagination v-slot="{ from, to, total, totalPages, page, onNext, onPrev, onFirst, onLast, hasNextPage, hasPrevPage }">
              <div class="table__pagination">
                  <div class="table__pagination__info">
                      <span>Showing {{ from }} to {{ to }} of {{ total }} entries</span>
                  </div>
                  <div class="table__pagination__controls">
                      <button
                          @click="onFirst()"
                          :disabled="page === 1"
                          class="table__pagination__control"
                      >
                          First
                      </button>
                      <button
                          :disabled="!hasPrevPage"
                          @click="onPrev()"
                          class="table__pagination__control"
                      >
                          Previous
                      </button>
                      <span>Page {{ page }} of {{ totalPages }}</span>
                      <button
                          @click="onNext()"
                          :disabled="!hasNextPage"
                          class="table__pagination__control"
                      >
                          Next
                      </button>
                      <button
                          @click="onLast()"
                          :disabled="page === totalPages"
                          class="table__pagination__control"
                      >
                          Last
                      </button>
                  </div>
              </div>
          </DataTablePagination>
        </DataTable>
    </div>
</template>
<style lang="css">
.table {
    font-family: 'Nunito Sans', sans-serif;
    color: #212529;
}

.table table {
    width: 100%;
    border-collapse: collapse;
}

.table__heading {
    background-color: #0001;
    font-weight: 600;
    padding: 8px 12px;
    opacity: 0.8;
}

.table__heading__inner {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    gap: 8px;
}

.table__heading__text {
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
}

.table__heading__controls {
    display: flex;
    align-items: center;
    gap: 8px;
}

.table__heading__control {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
}
.table__heading__control:not(.active) {
    opacity: 0.4;
}
.table__heading__control.active {
    color: #0088ff;
}
.table__heading__control:hover {
    opacity: 1;
}

.table__body .table__row {
    border-bottom: 1px solid #0001;
}

.table__row.selected {
    background-color: #0088ff11;
}

.table__cell {
    padding: 8px 12px;
    font-size: 14px;
}

.table__select {
    display: flex;
    align-items: center;
    justify-content: center;

}

.table__pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    font-size: 14px;
}

.table__pagination__controls {
    display: flex;
    align-items: center;
    gap: 8px;
}
</style>
