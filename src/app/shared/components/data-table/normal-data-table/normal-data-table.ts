import { Component, input } from '@angular/core';
import { Table } from '@tanstack/angular-table';
import { ZardTableComponent } from '../../table';
import { ZardIconComponent } from '../../icon';
import { ZardCheckboxComponent } from '../../checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-normal-data-table',
  imports: [FormsModule,ZardTableComponent, ZardIconComponent,ZardCheckboxComponent],
  templateUrl: './normal-data-table.html',
})
export class NormalDataTable<TData> {

  // Input: TanStack Table instance
  table = input.required<Table<TData>>();
  enableRowSelection = input(false);
  enableColumnVisibility = input(false);

}
