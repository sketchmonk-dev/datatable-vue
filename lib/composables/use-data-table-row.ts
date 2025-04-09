import { inject, provide, type Ref } from "vue";
import type { DataTableCellInfo, DataTableRowInfo } from "../common";
import { useDataTable } from "./use-data-table";

export interface DataTableRowContext<D> {
    row: Ref<DataTableRowInfo<D>>;
    cells: Ref<DataTableCellInfo<D>[]>;
}

const DATATABLE_ROW_INJECTION_KEY = Symbol('DATATABLE_ROW');

/**
 * Provides a `DataTableRow` instance to the component tree using Vue's dependency injection system.
 * This function uses the `provide` API to make the row data available to descendant components
 * that use the corresponding injection key.
 *
 * @template D - The type of the data contained in the `DataTableRow`.
 * @param row - The `DataTableRow` instance to be provided to the component tree.
 */
export function useProvideDataTableRow<D>(row: Ref<DataTableRowInfo<D>>) {
    const { columns } = useDataTable();
    const cells = columns.value.map((column) => ({
        value: column.def.accessor(row.value.datum, row.value.index),
        column,
        row: row.value,
        isSelected: row.value.isSelected,
    })) as DataTableCellInfo<D>[];

    const context = { row, cells };
    provide(DATATABLE_ROW_INJECTION_KEY, context);

    return context
}

/**
 * A composable function that provides access to the current data table row context.
 * This function must be used within a component that is a descendant of DataTableRow
 *
 * @template D - The type of the data associated with the data table row.
 * @throws If the function is called without a matching provider.
 * @returns The data table row context.
 */
export function useDataTableRow<D>() {
    const context = inject<DataTableRowContext<D>>(DATATABLE_ROW_INJECTION_KEY);
    if (!context) {
        throw new Error("useDataTableRow() must be used within DataTableRow");
    }
    return context;
}