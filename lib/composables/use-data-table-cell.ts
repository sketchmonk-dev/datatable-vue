import { inject, provide, type Ref } from "vue";
import type { DataTableCellInfo } from "../common";

const DATATABLE_CELL_INJECTION_KEY = Symbol('DATATABLE_CELL');

/**
 * Provides a `DataTableCell` instance to the component tree using Vue's dependency injection system.
 * This function uses the `provide` API to make the cell data available to descendant components
 * that use the corresponding injection key.
 *
 * @template D - The type of the data contained in the `DataTableCell`.
 * @param cell - The `DataTableCell` instance to be provided to the component tree.
 */
export function useProvideDataTableCell<D>(cell: Ref<DataTableCellInfo<D>>) {
    provide(DATATABLE_CELL_INJECTION_KEY, cell);
}

/**
 * A composable function that provides access to the current data table cell context.
 * This function must be used within a component that is a descendant of DataTableCell
 *
 * @template D - The type of the data associated with the data table cell.
 * @throws If the function is called without a matching provider.
 * @returns The data table cell context.
 */
export function useDataTableCell<D>() {
    const cell = inject<DataTableCellInfo<D>>(DATATABLE_CELL_INJECTION_KEY);
    if (!cell) {
        throw new Error("useDataTableCell() must be used within DataTableCell");
    }
    return cell;
}