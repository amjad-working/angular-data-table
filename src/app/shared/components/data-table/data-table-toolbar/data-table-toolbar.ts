import { CommonModule } from '@angular/common';
import { Component, input, output, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Column, ColumnDef, Table } from '@tanstack/angular-table';
import { ZardButtonComponent } from '../../button';
import { ZardButtonGroupComponent, ZardButtonGroupTextDirective } from '../../button-group';
import { ZardCheckboxComponent } from '../../checkbox';
import { ZardDropdownImports } from '../../dropdown';
import { ZardIconComponent } from '../../icon';
import { ZardInputDirective } from '../../input';
import { ZardInputGroupComponent } from '../../input-group/input-group.component';
import { ZardMenuImports } from '../../menu';
import { ZardPopoverComponent, ZardPopoverDirective } from '../../popover';
import { ZardSelectImports } from '../../select';
import { ToolbarAction } from '../data-table.types';

export interface IFilter {
  id: string,
  header: string,
  value: string,
}

@Component({
  selector: 'app-data-table-toolbar',
  imports: [
    FormsModule,
    CommonModule,
    ZardInputGroupComponent,
    ZardIconComponent,
    ZardInputDirective,
    ZardButtonComponent,
    ZardMenuImports,
    ZardDropdownImports,
    ZardCheckboxComponent,
    ZardSelectImports, ZardButtonGroupComponent, ZardButtonGroupTextDirective,
    ZardPopoverComponent, ZardPopoverDirective
  ],
  templateUrl: './data-table-toolbar.html',
})
export class DataTableToolbar<TData> {

  readonly advFilterTrigger = viewChild.required('advFilterTrigger', { read: ZardPopoverDirective });

  // Inputs
  table = input.required<Table<TData>>();
  search = input(false);
  searchValue = input('');
  actions = input<ToolbarAction[]>([]);
  selectedCount = input(0);

  // Outputs
  searchChange = output<string>();
  enableColumnVisibility = input(false);
  columnVisibilityClick = output<void>();

  advancedFilter = signal<IFilter[]>([
    {
      id: "",
      header: "",
      value: ""
    }
  ])

  onSearchInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchChange.emit(value);
  }

  onColumnVisibilityClick() {
    this.columnVisibilityClick.emit();
  }

  // Helper Function
  getMeta(cell: any, key: string) {
    return cell.columnDef.meta?.[key];
  }

  get isAnyFilterActive() {
    return Object.keys(this.table().getState().columnFilters).length > 0;
  }

  getHeaderValue(header: any) {
    return header;
  }

  // Filters
  resetColumnFilters() {
    this.table().getAllColumns().forEach((column: any) => {
      const meta = column.columnDef.meta;
      if (!meta) return;
      if (meta.type === 'multi-select') {
        meta.value = [];
      } else if (meta.type === 'single-select') {
        meta.value = '';
      }
    });
    this.advancedFilter.set([{ id: "", header: "", value: "" }])
    this.table().resetColumnFilters();
  }

  onFilterChange(cell: any, value: any) {
    // update table filter
    cell.setFilterValue(value);

    // ALSO update meta.value so UI stays in sync
    if (cell.columnDef.meta) {
      cell.columnDef.meta.value = value;
    }
  }

  // Advanced Filters
  addFilter() {
    this.advancedFilter.update((data: IFilter[]) => [...data, {
      id: "",
      header: "",
      value: ""
    }]);
  }

  removeFilter(index: number) {
    this.advancedFilter.update((data: IFilter[]) =>
      data.filter((_, i) => i !== index)
    )
  }

  applyFilter() {
    this.table().getAllColumns().forEach((column) => {
      const selectedCol = this.advancedFilter().find(f => f.id === column.id)
      if (selectedCol?.id) {
        column.setFilterValue(selectedCol?.value);
      }
    })
  }

}