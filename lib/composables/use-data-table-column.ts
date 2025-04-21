import { inject, provide, type Ref } from "vue";
import type { DataTableColumnInfo } from "../common";

const DATATABLE_COLUMN_INJECTION_KEY = Symbol('DATATABLE_COLUMN');


/**
 * Provides a `DataTableColumn` instance to the component tree using Vue's dependency injection system.
 * This function uses the `provide` API to make the column data available to descendant components
 * that use the corresponding injection key.
 *
 * @template D - The type of the data contained in the `DataTableColumn`.
 * @param column - The `DataTableColumn` instance to be provided to the component tree.
 */
export function useProvideDataTableColumn<D>(column: Ref<DataTableColumnInfo<D>>) {
    provide(DATATABLE_COLUMN_INJECTION_KEY, column);
}

/**
 * A composable function that provides access to the current data table column context.
 * This function must be used within a component that is a descendant of DataTableCell or DataTableHeading
 *
 * @template D - The type of the data associated with the data table column.
 * @throws If the function is called without a matching provider.
 * @returns The data table column context.
 */
export function useDataTableColumn<D>() {
    const column = inject<Ref<DataTableColumnInfo<D>>>(DATATABLE_COLUMN_INJECTION_KEY);
    if (!column) {
        throw new Error("useDataTableColumn() must be used within DataTableColumn");
    }
    return column;
}