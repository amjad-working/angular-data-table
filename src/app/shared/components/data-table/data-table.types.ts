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
    icon?: string;
    action: () => void;
    disabled?: boolean;
}