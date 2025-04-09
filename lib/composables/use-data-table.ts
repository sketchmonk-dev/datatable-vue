import { computed, inject, provide, type Ref } from "vue";
import type { DataTableColumnInfo, DataTableColumnDef, DataTableFilterState, DataTableOptions, DataTablePaginationState, DataTableRowInfo, DataTableSortState } from "../common";

/**
 * Represents the reactive state for a data table component.
 */
export interface DataTableState {
    /**
     * The current filters applied to the data table.
     */
    filters: Ref<DataTableFilterState>;
    /**
     * The current sorting applied to the data table.
     */
    sort: Ref<DataTableSortState | null>;
    /**
     * The current pagination settings for the data table.
     */
    pagination: Ref<DataTablePaginationState>;
}

export interface DataTableContext<D, M=any> extends DataTableState {
    /**
     * The columns of the data table.
     */
    columns: Ref<DataTableColumnInfo<D, M>[]>;
    /**
     * The rows of the data table.
     */
    rows: Ref<DataTableRowInfo<D>[]>;
    /**
     * The data displayed in the data table (only the current page).
     */
    data: Ref<D[]>;
    /**
     * The total number of items in the data table.
     */
    total: Ref<number>;
    // -- computed --
    /**
     * The starting index of the current page.
     */
    from: Ref<number>;
    /**
     * The ending index of the current page.
     */
    to: Ref<number>;
    /**
     * The total number of pages.
     */
    totalPages: Ref<number>;
    /**
     * Whether there is a next page.
     */
    hasNextPage: Ref<boolean>;
    /**
     * Whether there is a previous page.
     */
    hasPrevPage: Ref<boolean>;
    // -- mutations --
    /**
     * Sets the filters for the data table.
     * @param filters The new filters to apply.
     */
    setFilters: (filters: DataTableFilterState) => void;
    /**
     * Sets a specific filter for the data table.
     * @param key The key of the filter to set.
     * @param value The value of the filter to set.
     */
    setFilter: (key: string, value: any) => void;
    /**
     * Removes a specific filter from the data table.
     * @param key The key of the filter to remove.
     */
    removeFilter: (key: string) => void;
    /**
     * Clears all filters from the data table.
     */
    clearFilters: () => void;
    /**
     * Sets the sorting for the data table.
     * @param sort The new sorting to apply.
     */
    setSort: (sort: DataTableSortState | null) => void;
    /**
     * Clears the sorting from the data table.
     */
    clearSort: () => void;
    /**
     * Sets the pagination for the data table.
     * @param pagination The new pagination to apply.
     */
    setPagination: (pagination: DataTablePaginationState) => void;
    /**
     * Sets the current page for the data table.
     * @param page The new page to set.
     */
    setPage: (page: number) => void;
    /**
     * Sets the number of items per page for the data table.
     * @param perPage The new number of items per page to set.
     */
    setPerPage: (perPage: number) => void;
    // -- selection --
    /**
     * The current selection of items in the data table.
     */
    selection: Ref<D[]>;
    /**
     * Sets the selection of items in the data table.
     * @param selection The new selection to set.
     */
    setSelection: (selection: D[]) => void;
    /**
     * Clears the current selection of items in the data table.
     */
    clearSelection: () => void;
    /**
     * Selects a specific item in the data table.
     * @param row The item to select.
     */
    select: (row: D) => void;
    /**
     * Unselects a specific item in the data table.
     * @param row The item to unselect.
     */
    unselect: (row: D) => void;
    /**
     * Toggles the selection state of a specific item in the data table.
     * @param row The item to toggle.
     */
    toggleSelect: (row: D) => void;
    /**
     * Checks if a specific item is selected in the data table.
     * @param row The item to check.
     * @returns `true` if the item is selected, `false` otherwise.
     */
    isSelected: (row: D) => boolean;
    /**
     * Checks if all items in the current page are selected.
     * @returns `true` if all items are selected, `false` otherwise.
     */
    isAllSelected: Ref<boolean>;
    /**
     * Checks if some items in the current page are selected.
     * @returns `true` if some items are selected, `false` otherwise.
     */
    isSomeSelected: Ref<boolean>;
    /**
     * Selects all items in the current page.
     */
    selectAll: () => void;
    /**
     * Unselects all items in the current page.
     */
    unselectAll: () => void;
    /**
     * Toggles the selection state of all items in the current page.
     */
    toggleSelectAll: () => void;
}

const DATATABLE_INJECTION_KEY = Symbol("DATATABLE");

export function useProvideDataTable<D, M=any>(
    data: Ref<D[]>, 
    total: Ref<number>,
    columnDefs: Ref<DataTableColumnDef<D, M>[]>, 
    state: DataTableState,
    selection: Ref<D[]>,
    options: Ref<DataTableOptions<D>>,
) {
    const { filters, sort, pagination } = state;
    // -- computed --
    const from = computed(() => (pagination.value.page - 1) * pagination.value.perPage + 1);
    const to = computed(() => {
        const end = pagination.value.page * pagination.value.perPage;
        return end > total.value ? total.value : end;
    });
    const totalPages = computed(() => Math.ceil(total.value / pagination.value.perPage));
    const hasNextPage = computed(() => {
        return pagination.value.page < totalPages.value;
    });
    const hasPrevPage = computed(() => {
        return pagination.value.page > 1;
    });
    // -- utils --
    const resetPagination = () => {
        pagination.value = {
            ...pagination.value,
            page: 1,
        }
    };
    // -- mutations --
    const setFilters = (newFilters: DataTableFilterState) => {
        filters.value = { ...newFilters };
        resetPagination();
    };
    const setFilter = (key: string, value: any) => {
        filters.value[key] = value;
        resetPagination();
    };
    const removeFilter = (key: string) => {
        const { [key]: _, ...rest } = filters.value;
        filters.value = rest;
        resetPagination();
    };
    const clearFilters = () => {
        filters.value = {};
        resetPagination();
    };
    const setSort = (newSort: DataTableSortState | null) => {
        sort.value = newSort;
        resetPagination();
    };
    const clearSort = () => {
        sort.value = null;
        resetPagination();
    };
    const setPagination = (newPagination: DataTablePaginationState) => {
        pagination.value = newPagination;
    };
    const setPage = (page: number) => {
        if (page > 0 && page <= totalPages.value) {
            pagination.value = {
                ...pagination.value,
                page,
            };
        }
    };
    const setPerPage = (perPage: number) => {
        pagination.value = {
            ...pagination.value,
            perPage,
            page: 1,
        }
    };

    // -- columns --
    const columns = computed(() => {
        return columnDefs.value.map((def) => {
            const column: DataTableColumnInfo<D, M> = {
                key: def.key,
                def,
                filter: filters.value[def.key] ?? null,
                setFilter: (value: any) => {
                    setFilter(def.key, value);
                },
                removeFilter: () => {
                    removeFilter(def.key);
                },
                sort: sort.value?.field === def.key ? sort.value.order : null,
                setSort: (order: 'asc' | 'desc') => {
                    setSort({ field: def.key, order });
                },
                removeSort: () => {
                    if (sort.value?.field === def.key) {
                        clearSort();
                    }
                },
                toggleSort: () => {
                    if (sort.value?.field === def.key) {
                        if (sort.value.order === 'asc') {
                            setSort({ field: def.key, order: 'desc' });
                        } else {
                            clearSort();
                        }
                    } else {
                        setSort({ field: def.key, order: 'asc' });
                    }
                },
            };
            return column;
        })
    });

    // -- selection --
    const setSelection = (newSelection: D[]) => {
        selection.value = newSelection;
    };
    const isRowEqual = (row1: D, row2: D) => {
        return options.value.identity(row1) === options.value.identity(row2);
    }
    const isSelected = (row: D) => selection.value.some((r) => isRowEqual(r, row));
    const select = (row: D) => {
        if (!isSelected(row)) {
            selection.value.push(row);
        }
    };
    const unselect = (row: D) => {
        selection.value = selection.value.filter((r) => !isRowEqual(r, row));
    };
    const toggleSelect = (row: D) => {
        isSelected(row) ? unselect(row) : select(row);
    };
    const isAllSelected = computed(() => {
        // we need to check if all items in the data are selected
        return data.value.every((row) => isSelected(row));
    });
    const isSomeSelected = computed(() => {
        // we need to check if some items in the data are selected
        return data.value.some((row) => isSelected(row));
    });
    const selectAll = () => {
        const newSelection: D[] = [];
        data.value.forEach((row) => {
            if (!isSelected(row)) {
                newSelection.push(row);
            }
        });
        selection.value = [...selection.value, ...newSelection];
    };
    const unselectAll = () => {
        selection.value = selection.value.filter((row) => !data.value.some((r) => isRowEqual(r, row)));
    };
    const toggleSelectAll = () => {
        if (isAllSelected.value || isSomeSelected.value) {
            unselectAll();
        } else {
            selectAll();
        }
    };
    const clearSelection = () => {
        selection.value = [];
    };

    // -- rows --
    const rows = computed<DataTableRowInfo<D>[]>(() => {
        return data.value.map((datum, index) => {
            return {
                id: options.value.identity(datum),
                datum,
                index,
                isSelected: isSelected(datum),
                select: () => {
                    select(datum);
                },
                unselect: () => {
                    unselect(datum);
                },
                toggleSelect: () => {
                    toggleSelect(datum);
                }
            }
        })
    })

    const context: DataTableContext<D, M> = {
        data,
        columns,
        rows,
        total,
        // -- state --
        filters,
        sort,
        pagination,
        // -- computed --
        from,
        to,
        totalPages,
        hasNextPage,
        hasPrevPage,
        // -- mutations --
        setFilters,
        setFilter,
        removeFilter,
        clearFilters,
        setSort,
        clearSort,
        setPagination,
        setPage,
        setPerPage,
        // -- selection --
        selection,
        setSelection,
        clearSelection,
        select,
        unselect,
        toggleSelect,
        isSelected,
        isAllSelected,
        isSomeSelected,
        selectAll,
        unselectAll,
        toggleSelectAll,
    };
    provide(DATATABLE_INJECTION_KEY, context);
}

/**
 * A composable function that provides access to the `DataTable` context.
 * This function must be used within a `DataTable` component or a component
 * that is a descendant of a `DataTable` provider.
 *
 * @template T - The type of the data managed by the `DataTable`.
 * @throws Throws an error if the function is called outside of a `DataTable` context.
 * @returns The context object for the `DataTable`.
 */
export function useDataTable<D, M=any>() {
    const context = inject<DataTableContext<D, M>>(DATATABLE_INJECTION_KEY);
    if (!context) {
        throw new Error("useDataTable must be used within a DataTable");
    }
    return context;
}