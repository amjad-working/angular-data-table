import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { PaginationData } from '../data-table.types';
import { ZardButtonComponent } from '../../button';
import { ZardIconComponent } from '../../icon';
import { ZardSelectImports } from '../../select';

@Component({
  selector: 'app-data-table-pagination',
  imports: [CommonModule, ZardButtonComponent, ZardIconComponent, ZardSelectImports],
  templateUrl: './data-table-pagination.html',
})
export class DataTablePagination {
  // Inputs
  paginationData = input.required<PaginationData>();
  pageSizeOptions = input<number[]>([10, 25, 50, 100]);
  currentPageSize = input<number>(10);

  // Outputs
  firstPage = output<void>();
  previousPage = output<void>();
  nextPage = output<void>();
  lastPage = output<void>();
  pageSizeChange = output<number>();

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

  onPageSizeChange(event: any) {
    this.pageSizeChange.emit(parseInt(event));
  }
}
