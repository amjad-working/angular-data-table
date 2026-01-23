import { CommonModule } from '@angular/common';
import { Component, computed, effect, input, signal } from '@angular/core';
import {
  ColumnDef,
  createAngularTable,
  FlexRenderDirective,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
} from '@tanstack/angular-table';
import { DataTableToolbar } from './data-table-toolbar/data-table-toolbar';
import { DataTablePagination } from './data-table-pagination/data-table-pagination';
import { PaginationData } from './data-table.types';
import { NormalDataTable } from './normal-data-table/normal-data-table';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, NormalDataTable, DataTableToolbar, DataTablePagination],
  templateUrl: './data-table.html',
})

export class DataTableComponent<TData, TValue> {

  /* ----------------------------------------
   * Primary Inputs
   * ---------------------------------------- */
  data = input<TData[]>([]);
  columns = input<ColumnDef<TData, TValue>[]>([]);
  search = input<boolean>(true);
  pageSize = input<number>(10);

  /* ----------------------------------------
   * Table State Signals
   * ---------------------------------------- */
  globalFilter = signal('');
  sorting = signal<SortingState>([]);
  pagination = signal<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  /* ----------------------------------------
   * TanStack Table
   * ---------------------------------------- */
  table = createAngularTable(() => ({
    data: this.data(),
    columns: this.columns(),
    getCoreRowModel: getCoreRowModel(),

    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: updater =>
      this.globalFilter.set(
        typeof updater === 'function'
          ? updater(this.globalFilter())
          : updater
      ),

    getSortedRowModel: getSortedRowModel(),
    onSortingChange: updater =>
      this.sorting.set(
        typeof updater === 'function'
          ? updater(this.sorting())
          : updater
      ),

    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: updater =>
      this.pagination.set(
        typeof updater === 'function'
          ? updater(this.pagination())
          : updater
      ),

    globalFilterFn: 'includesString',

    state: {
      globalFilter: this.globalFilter(),
      sorting: this.sorting(),
      pagination: this.pagination(),
    },
  }));

  /* ----------------------------------------
   * Effects
   * ---------------------------------------- */
  constructor() {
    effect(() => {
      this.pagination.update(p => ({
        ...p,
        pageSize: this.pageSize(),
      }));
    });
  }

  /* ----------------------------------------
   * Computed Helpers
   * ---------------------------------------- */
  currentPage = computed(() => this.pagination().pageIndex + 1);
  pageCount = computed(() => this.table.getPageCount());

  totalRows = computed(
    () => this.table.getFilteredRowModel().rows.length
  );

  startIndex = computed(
    () => this.pagination().pageIndex * this.pagination().pageSize + 1
  );

  endIndex = computed(() =>
    Math.min(
      (this.pagination().pageIndex + 1) * this.pagination().pageSize,
      this.totalRows()
    )
  );

  // Pagination data for child component
  paginationData = computed<PaginationData>(() => ({
    currentPage: this.currentPage(),
    pageCount: this.pageCount(),
    totalRows: this.totalRows(),
    startIndex: this.startIndex(),
    endIndex: this.endIndex(),
    canPreviousPage: this.table.getCanPreviousPage(),
    canNextPage: this.table.getCanNextPage(),
  }));

  /* ----------------------------------------
   * Actions
   * ---------------------------------------- */
  onSearchChange(value: string) {
    this.globalFilter.set(value);
  }

  firstPage() {
    this.table.setPageIndex(0);
  }

  prevPage() {
    this.table.previousPage();
  }

  nextPage() {
    this.table.nextPage();
  }

  lastPage() {
    this.table.setPageIndex(this.pageCount() - 1);
  }
}