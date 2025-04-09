# DataTable Vue

A headless Vue 3 DataTable component library that provides powerful data table functionality while giving you complete control over the UI.

## Introduction

The DataTable Vue library offers a collection of headless components that handle complex data table functionality, such as:

- Sorting
- Filtering
- Pagination
- Row selection
- Column configuration

The library provides the logic and state management while giving you complete freedom to design your own UI. This separation of concerns allows you to create highly customizable data tables without being limited by predefined styles or markup.

## Installation

```bash
npm install @sketchmonk/datatable-vue
```

or

```bash
yarn add @sketchmonk/datatable-vue
```

## Basic Usage

```vue
<script setup>
import { 
  DataTable, 
  DataTableHeader, 
  DataTableBody, 
  DataTableRow, 
  DataTableCell 
} from '@sketchmonk/datatable-vue';
import { ref, computed } from 'vue';

// Define your columns
const columns = [
  {
    key: 'name',
    title: 'Name',
    accessor: (row) => row.name,
    sortable: true
  },
  {
    key: 'email',
    title: 'Email',
    accessor: (row) => row.email
  }
];

// Sample data
const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

// State for the data table
const pagination = ref({ page: 1, perPage: 10 });
const filters = ref({});
const sort = ref(null);
const selection = ref([]);

// Computed properties for the data
const total = computed(() => sampleData.length);
const tableData = computed(() => sampleData);
</script>

<template>
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
        <thead>
          <tr>
            <th v-for="column in columns" :key="column.key">
              {{ column.def.title }}
            </th>
          </tr>
        </thead>
      </DataTableHeader>
      <DataTableBody v-slot="{ rows }">
        <tbody>
          <DataTableRow v-for="row in rows" :key="row.id" :row="row" v-slot="{ cells }">
            <tr>
              <DataTableCell v-for="cell in cells" :key="cell.column.key" :cell="cell">
                <td>{{ cell.value }}</td>
              </DataTableCell>
            </tr>
          </DataTableRow>
        </tbody>
      </DataTableBody>
    </table>
  </DataTable>
</template>
```

## Components API

### DataTable

The root component that provides the data table context to all child components.

#### Props

| Prop       | Type                           | Required | Description                                      |
| ---------- | ------------------------------ | -------- | ------------------------------------------------ |
| `columns`  | `DataTableColumnDef<D>[]`      | Yes      | Array of column definitions                      |
| `data`     | `D[]`                          | Yes      | Array of data items to display                   |
| `total`    | `number`                       | Yes      | Total number of items (for pagination)           |
| `identity` | `(row: D) => string \| number` | Yes      | Function to get a unique identifier for each row |

#### Models

| Model        | Type                         | Default                    | Description              |
| ------------ | ---------------------------- | -------------------------- | ------------------------ |
| `filters`    | `DataTableFilterState`       | `{}`                       | Current filter state     |
| `sort`       | `DataTableSortState \| null` | `null`                     | Current sort state       |
| `pagination` | `DataTablePaginationState`   | `{ page: 1, perPage: 10 }` | Current pagination state |
| `selection`  | `D[]`                        | `[]`                       | Currently selected rows  |

#### Slots

| Slot    | Props | Description                   |
| ------- | ----- | ----------------------------- |
| default | -     | The content of the data table |

### DataTableHeader

Provides context for the table header.

#### Slots

| Slot    | Props         | Description                                         |
| ------- | ------------- | --------------------------------------------------- |
| default | `{ columns }` | Content of the table header, with access to columns |

### DataTableHeading

Provides context for a table column heading.

#### Props

| Prop     | Type                     | Required | Description        |
| -------- | ------------------------ | -------- | ------------------ |
| `column` | `DataTableColumnInfo<D>` | Yes      | Column information |

#### Slots

| Slot    | Props                    | Description                                                     |
| ------- | ------------------------ | --------------------------------------------------------------- |
| default | `DataTableColumnInfo<D>` | Content of the column heading with access to column information |

### DataTableBody

Provides context for the table body.

#### Slots

| Slot    | Props      | Description                                   |
| ------- | ---------- | --------------------------------------------- |
| default | `{ rows }` | Content of the table body with access to rows |
| empty   | -          | Content to display when there are no rows     |

### DataTableRow

Provides context for a table row.

#### Props

| Prop  | Type                  | Required | Description     |
| ----- | --------------------- | -------- | --------------- |
| `row` | `DataTableRowInfo<D>` | Yes      | Row information |

#### Slots

| Slot    | Props                     | Description                                                 |
| ------- | ------------------------- | ----------------------------------------------------------- |
| default | Row props and `{ cells }` | Content of the row with access to row information and cells |

### DataTableCell

Provides context for a table cell.

#### Props

| Prop   | Type                   | Required | Description      |
| ------ | ---------------------- | -------- | ---------------- |
| `cell` | `DataTableCellInfo<D>` | Yes      | Cell information |

#### Slots

| Slot    | Props      | Description                                         |
| ------- | ---------- | --------------------------------------------------- |
| default | Cell props | Content of the cell with access to cell information |

### DataTablePageSelector

Provides selection functionality for the current page.

#### Slots

| Slot    | Props                                                                                                   | Description                                             |
| ------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| default | `{ checked, indeterminate, onChange, onToggle, isAllSelected, isSomeSelected, selectAll, unselectAll }` | Content with access to page selection state and methods |

### DataTableRowSelector

Provides selection functionality for a specific row.

#### Slots

| Slot    | Props                                             | Description                                            |
| ------- | ------------------------------------------------- | ------------------------------------------------------ |
| default | `{ value, onChange, onToggle, select, unselect }` | Content with access to row selection state and methods |

### DataTablePagination

Provides pagination functionality.

#### Slots

| Slot    | Props                                                                                                                                      | Description                                         |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------- |
| default | `{ from, to, total, totalPages, page, perPage, onPageChange, onPerPageChange, hasNextPage, hasPrevPage, onNext, onPrev, onLast, onFirst }` | Content with access to pagination state and methods |

## Types

### DataTableColumnDef<D, M=any>

```typescript
interface DataTableColumnDef<D, M=any> {
  key: string;                   // Unique column identifier
  title: VNode | string;         // Column display title
  accessor: (row: D, index: number) => any;  // Function to access data
  sortable?: boolean;            // Whether the column is sortable
  filterable?: boolean;          // Whether the column is filterable
  meta?: M;                      // Optional metadata for the column
}
```

### DataTablePaginationState

```typescript
interface DataTablePaginationState {
  page: number;      // Current page number
  perPage: number;   // Items per page
}
```

### DataTableSortState

```typescript
interface DataTableSortState {
  field: string;     // Column key to sort by
  order: "asc" | "desc";  // Sort direction
}
```

### DataTableFilterState

```typescript
interface DataTableFilterState {
  [key: string]: any;  // Key-value pairs of filter values
}
```

## Advanced Example

The following example demonstrates a more advanced implementation with sorting, selection, and pagination:

```vue
<script setup>
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
} from '@sketchmonk/datatable-vue';
import { ref, computed } from 'vue';

// Define your columns
const columns = [
  {
    key: 'name',
    title: 'Name',
    accessor: (row) => row.name,
    sortable: true
  },
  {
    key: 'email',
    title: 'Email',
    accessor: (row) => row.email,
    sortable: true
  },
  {
    key: 'status',
    title: 'Status',
    accessor: (row) => row.active ? 'Active' : 'Inactive',
    filterable: true
  }
];

// Sample data
const data = [
  { id: 1, name: 'John Doe', email: 'john@example.com', active: true },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', active: false },
  // ... more data
];

// State for the data table
const pagination = ref({ page: 1, perPage: 10 });
const filters = ref({});
const sort = ref(null);
const selection = ref([]);

// Computed properties
const total = computed(() => data.length);
const tableData = computed(() => {
  // In a real application, you might fetch data from an API here
  // using the pagination, filters, and sort values
  return data.slice(
    (pagination.value.page - 1) * pagination.value.perPage,
    pagination.value.page * pagination.value.perPage
  );
});
</script>

<template>
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
    <div class="data-table">
      <table>
        <DataTableHeader v-slot="{ columns }">
          <thead>
            <tr>
              <DataTablePageSelector v-slot="{ checked, indeterminate, onChange }">
                <th>
                  <input
                    type="checkbox"
                    :checked="checked"
                    :indeterminate="indeterminate"
                    @change="onChange($event.target.checked)"
                  />
                </th>
              </DataTablePageSelector>
              <DataTableHeading
                v-for="column in columns"
                :key="column.key"
                :column="column"
                v-slot="columnProps"
              >
                <th>
                  <div class="heading-content">
                    <span>{{ column.def.title }}</span>
                    <button
                      v-if="column.def.sortable"
                      @click="columnProps.toggleSort"
                      class="sort-button"
                    >
                      {{ columnProps.sort === 'asc' ? '↑' : columnProps.sort === 'desc' ? '↓' : '↕' }}
                    </button>
                  </div>
                </th>
              </DataTableHeading>
            </tr>
          </thead>
        </DataTableHeader>
        <DataTableBody v-slot="{ rows }">
          <tbody>
            <DataTableRow
              v-for="row in rows"
              :key="row.id"
              :row="row"
              v-slot="{ cells }"
            >
              <tr :class="{ selected: row.isSelected }">
                <td>
                  <DataTableRowSelector v-slot="{ value, onChange }">
                    <input
                      type="checkbox"
                      :checked="value"
                      @change="onChange($event.target.checked)"
                    />
                  </DataTableRowSelector>
                </td>
                <DataTableCell
                  v-for="cell in cells"
                  :key="cell.column.key"
                  :cell="cell"
                >
                  <td>{{ cell.value }}</td>
                </DataTableCell>
              </tr>
            </DataTableRow>
          </tbody>
        </DataTableBody>
      </table>
      <DataTablePagination v-slot="paginationProps">
        <div class="pagination">
          <div>
            Showing {{ paginationProps.from }} to {{ paginationProps.to }} of {{ paginationProps.total }} entries
          </div>
          <div class="pagination-controls">
            <button
              @click="paginationProps.onFirst"
              :disabled="!paginationProps.hasPrevPage"
            >
              First
            </button>
            <button
              @click="paginationProps.onPrev"
              :disabled="!paginationProps.hasPrevPage"
            >
              Previous
            </button>
            <span>
              Page {{ paginationProps.page }} of {{ paginationProps.totalPages }}
            </span>
            <button
              @click="paginationProps.onNext"
              :disabled="!paginationProps.hasNextPage"
            >
              Next
            </button>
            <button
              @click="paginationProps.onLast"
              :disabled="!paginationProps.hasNextPage"
            >
              Last
            </button>
          </div>
        </div>
      </DataTablePagination>
    </div>
  </DataTable>
</template>

<style>
.data-table {
  width: 100%;
}
table {
  width: 100%;
  border-collapse: collapse;
}
thead th {
  background: #f1f1f1;
  padding: 8px;
  text-align: left;
}
.heading-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.sort-button {
  background: none;
  border: none;
  cursor: pointer;
}
tbody td {
  padding: 8px;
  border-bottom: 1px solid #ddd;
}
tr.selected {
  background-color: #e6f7ff;
}
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
}
.pagination-controls {
  display: flex;
  gap: 8px;
  align-items: center;
}
</style>
```

## Composables

For advanced customization, the library provides several composables:

- `useDataTable<D>()`: Access the data table context
- `useDataTableRow<D>()`: Access the current row context
- `useDataTableCell<D>()`: Access the current cell context
- `useDataTableColumn<D>()`: Access the current column context

These composables can be used within custom components to access the data table state and methods.

## Extending with Custom Components

You can create custom components that integrate with the DataTable by using the provided composables. For example, to create a custom cell renderer:

```vue
<script setup>
import { useDataTableCell } from '@sketchmonk/datatable-vue';

const cell = useDataTableCell();
</script>

<template>
  <div class="custom-cell">
    <span class="label">{{ cell.column.def.title }}:</span>
    <strong>{{ cell.value }}</strong>
  </div>
</template>
```

## License

MIT

