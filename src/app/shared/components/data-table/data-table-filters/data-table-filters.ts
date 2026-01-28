import { Component, input, signal } from '@angular/core';
import { ZardSelectImports } from '../../select';
import { Table } from '@tanstack/angular-table';

@Component({
  selector: 'app-data-table-filters',
  imports: [ZardSelectImports],
  templateUrl: './data-table-filters.html',
})
export class DataTableFilters<TData> {

  table = input.required<Table<TData>>();

  ngOnInit() {
    // You can access the table instance here if needed
    console.log(this.table().getAllColumns());
  }

  getMeta(cell: any, key: string) {
    return cell.columnDef.meta?.[key];
  }

}
