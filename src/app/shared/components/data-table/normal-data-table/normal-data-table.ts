import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Table } from '@tanstack/angular-table';
import { ZardButtonComponent } from '../../button';
import { ZardCheckboxComponent } from '../../checkbox';
import { ZardDividerComponent } from '../../divider';
import { ZardIconComponent } from '../../icon';
import { ZardMenuImports } from '../../menu';
import { ZardTableComponent } from '../../table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-normal-data-table',
  imports: [CommonModule, FormsModule, ZardButtonComponent, ZardTableComponent, ZardIconComponent, ZardCheckboxComponent,
    ZardMenuImports, ZardDividerComponent],
  templateUrl: './normal-data-table.html',
})
export class NormalDataTable<TData> {

  // Input: TanStack Table instance
  table = input.required<Table<TData>>();
  enableRowSelection = input(false);
  enableColumnVisibility = input(false);

  metaActions(row: any, cell: any) {
    return cell.column.columnDef.meta?.actions(row.original);
  }
}
