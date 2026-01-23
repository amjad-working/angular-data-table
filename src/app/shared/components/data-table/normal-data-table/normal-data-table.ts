import { Component, input } from '@angular/core';
import { Table } from '@tanstack/angular-table';

@Component({
  selector: 'app-normal-data-table',
  imports: [],
  templateUrl: './normal-data-table.html',
})
export class NormalDataTable<TData> {

  // Input: TanStack Table instance
  table = input.required<Table<TData>>();

}
