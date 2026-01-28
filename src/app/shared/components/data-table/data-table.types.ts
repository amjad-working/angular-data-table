import { ZardButtonTypeVariants } from "../button";
import { ZardIcon } from "../icon";

// Shared types for data table components
export interface PaginationData {
    currentPage: number;
    pageCount: number;
    totalRows: number;
    startIndex: number;
    endIndex: number;
    canPreviousPage: boolean;
    canNextPage: boolean;
}

// You can add more shared types here as needed
export interface ToolbarAction {
    label: string;
    icon?: ZardIcon;
    onClick: () => void;
    variant: ZardButtonTypeVariants;
    disabled?: boolean;
}

export interface ColumnVisibilityState {
    [columnId: string]: boolean;
}

export interface RowAction<T> {
    label: string;
    icon?: ZardIcon;
    disabled?: boolean;
    action: (row: T) => void;
}

export interface AppColumnMeta<TData> {
  actions?: (row: TData) => RowAction<TData>[];
}