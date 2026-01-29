import { ZardButtonGroupComponent, ZardButtonGroupTextDirective } from '@/shared/components/button-group/button-group.component';
import { Component, input } from '@angular/core';
import { Table } from '@tanstack/angular-table';
import { ZardSelectImports } from '../../select';
import { ZardButtonComponent } from '../../button';
import { ZardIconComponent } from '../../icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-data-table-filters',
  imports: [CommonModule, FormsModule, ZardSelectImports, ZardButtonGroupComponent, ZardButtonGroupTextDirective, ZardButtonComponent, ZardIconComponent],
  templateUrl: './data-table-filters.html',
})
export class DataTableFilters<TData> {

  table = input.required<Table<TData>>();

  ngOnInit() {
    // You can access the table instance here if needed
  }

  getMeta(cell: any, key: string) {
    return cell.columnDef.meta?.[key];
  }

  get isAnyFilterActive() {
    return Object.keys(this.table().getState().columnFilters).length > 0;
  }
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


}
