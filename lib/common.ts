import { type VNode } from "vue";

export type AccessorFn<D> = (row: D, index: number) => any;
export type IdentityFn<D> = (row: D) => string | number;
export interface DataTableColumnDef<D, M=any> {
    /**
     * A unique key for the column. This is used to identify the column in the data table.
     * It should be unique across all columns in the data table.
     * This key is used for sorting, filtering, and other operations.
     */
    key: string;
    title: VNode | string;
    accessor: AccessorFn<D>;
    sortable?: boolean;
    filterable?: boolean;
    meta?: M;
}

export interface DataTableColumnInfo<D, M=any> {
    key: string;
    def: DataTableColumnDef<D, M>;
    filter: any | null;
    removeFilter: () => void;
    sort: 'asc' | 'desc' | null;
    setFilter: (value: any) => void;
    setSort: (order: 'asc' | 'desc') => void;
    removeSort: () => void;
    toggleSort: () => void;
}
export interface DataTableRowInfo<D> {
    id: string | number;
    index: number;
    datum: D;
    isSelected: boolean;
    select: () => void;
    unselect: () => void;
    toggleSelect: () => void;
}
export interface DataTableCellInfo<D, M=any> {
    value: any;
    column: DataTableColumnInfo<D, M>;
    row: DataTableRowInfo<D>;
    isSelected: boolean;
}

export interface DataTableOptions<D> {
    identity: IdentityFn<D>;
}

export interface DataTableFilterState {
    [key: string]: any;
}

export interface DataTableSortState {
    field: string;
    order: "asc" | "desc";
}

export interface DataTablePaginationState {
    page: number;
    perPage: number;
}