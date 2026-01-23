import { Component, input, output } from '@angular/core';
import { Table } from '@tanstack/angular-table';

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
  search?: boolean;
  view?: boolean;
  filter?: boolean;
}

@Component({
  selector: 'app-data-table-toolbar',
  imports: [],
  templateUrl: './data-table-toolbar.html',
})
export class DataTableToolbar<TData> {

  // Inputs
  search = input(false);
  searchValue = input('');

  // Outputs
  searchChange = output<string>();

  // Event handler
  onSearchInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchChange.emit(value);
  }
}