import { Component, input } from '@angular/core';
import { Table } from '@tanstack/angular-table';
import { ZardTableComponent } from '../../table';
import { ZardIconComponent } from '../../icon';

@Component({
  selector: 'app-normal-data-table',
  imports: [ZardTableComponent, ZardIconComponent],
  templateUrl: './normal-data-table.html',
})
export class NormalDataTable<TData> {

  // Input: TanStack Table instance
  table = input.required<Table<TData>>();

}
