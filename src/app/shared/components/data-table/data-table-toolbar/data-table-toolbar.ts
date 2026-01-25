import { Component, input, output } from '@angular/core';
import { Table } from '@tanstack/angular-table';
import { ZardInputGroupComponent } from '../../input-group/input-group.component';
import { ZardIconComponent } from '../../icon';
import { ZardInputDirective } from '../../input';
import { ToolbarAction } from '../data-table.types';
import { ZardButtonComponent } from '../../button';
import { ZardMenuImports } from '../../menu';
import { ZardDropdownImports } from '../../dropdown';
import { ZardCheckboxComponent } from '../../checkbox';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-data-table-toolbar',
  imports: [FormsModule, CommonModule, ZardInputGroupComponent, ZardIconComponent, ZardInputDirective, ZardButtonComponent, ZardMenuImports, ZardDropdownImports, ZardCheckboxComponent],
  templateUrl: './data-table-toolbar.html',
})
export class DataTableToolbar<TData> {

  table = input.required<Table<TData>>();
  // Inputs
  search = input(false);
  searchValue = input('');
  actions = input<ToolbarAction[]>([]);
  selectedCount = input(0);

  // Outputs
  searchChange = output<string>();
  enableColumnVisibility = input(false);
  columnVisibilityClick = output<void>();

  // Event handler
  onSearchInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchChange.emit(value);
  }

  onColumnVisibilityClick() {
    this.columnVisibilityClick.emit();
  }
}