import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  effect,
  input,
  signal,
} from '@angular/core';
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

export interface TableConfig {
  title?: string;
  showSearch?: boolean;
  showPagination?: boolean;
  pageSize?: number;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-table.html',
  styleUrl: './data-table.scss',
})
export class DataTableComponent<T> {
  /* ----------------------------------------
   * Input Signals (Angular 20)
   * ---------------------------------------- */
  data = input<T[]>([]);
  columns = input<ColumnDef<T>[]>([]);
  config = input<TableConfig>({
    title: 'Data Table',
    showSearch: true,
    showPagination: true,
    pageSize: 10,
  });

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
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    // 🔥 REQUIRED
    globalFilterFn: 'includesString',

    state: {
      globalFilter: this.globalFilter(),
      sorting: this.sorting(),
      pagination: this.pagination(),
    },

    onGlobalFilterChange: updater =>
      this.globalFilter.set(
        typeof updater === 'function'
          ? updater(this.globalFilter())
          : updater
      ),

    onSortingChange: updater =>
      this.sorting.set(
        typeof updater === 'function'
          ? updater(this.sorting())
          : updater
      ),

    onPaginationChange: updater =>
      this.pagination.set(
        typeof updater === 'function'
          ? updater(this.pagination())
          : updater
      ),
  }));


  /* ----------------------------------------
   * Effects
   * ---------------------------------------- */
  constructor() {
    effect(() => {
      this.pagination.update(p => ({
        ...p,
        pageSize: this.config().pageSize ?? 10,
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
      (this.pagination().pageIndex + 1) *
      this.pagination().pageSize,
      this.totalRows()
    )
  );

  /* ----------------------------------------
   * Actions
   * ---------------------------------------- */
  onSearch(value: string) {
    this.globalFilter.set(value);
  }

  onSearchInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.onSearch(value);
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