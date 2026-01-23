import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { PaginationData } from '../data-table.types';
import { ZardButtonComponent } from '../../button';
import { ZardIconComponent } from '../../icon';

@Component({
  selector: 'app-data-table-pagination',
  imports: [CommonModule, ZardButtonComponent, ZardIconComponent],
  templateUrl: './data-table-pagination.html',
})
export class DataTablePagination {
  // Inputs
  paginationData = input.required<PaginationData>();

  // Outputs
  firstPage = output<void>();
  previousPage = output<void>();
  nextPage = output<void>();
  lastPage = output<void>();

  // Event handlers
  onFirstPage() {
    this.firstPage.emit();
  }

  onPreviousPage() {
    this.previousPage.emit();
  }

  onNextPage() {
    this.nextPage.emit();
  }

  onLastPage() {
    this.lastPage.emit();
  }
}
