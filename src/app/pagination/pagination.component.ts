import { Component, EventEmitter, input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {

  currentPage = input.required<number>();
  totalItemsCount = input.required<number>();
  perPage = input.required<number>();
  pagesToShow = input.required<number>();

  @Output() prev = new EventEmitter<boolean>();
  @Output() next = new EventEmitter<boolean>();
  @Output() goPage = new EventEmitter<number>();

  onPage = (n: number): void => {
    this.goPage.emit(n);
  }

  isOnLastPage = (): boolean => {
    // console.log(this.perPage * this.currentPage, this.totalItemsCount);
    return this.perPage() * this.currentPage() >= this.totalItemsCount();
  }

  totalPages = (): number => {
    return Math.ceil(this.totalItemsCount() / this.perPage()) || 0;
  }

  getMin = (): number => {
    return ((this.perPage() * this.currentPage()) - this.perPage()) + 1;
  }

  etMax = (): number => {
    let max = this.perPage() * this.currentPage();
    if (max > this.totalItemsCount()) {
      max = this.totalItemsCount();
    }
    return max;
  }
  onPrev = (): void => {
    this.prev.emit(true);
  }

  onNext = (): void => {
    this.next.emit(true);
  }

  getPages = (): number[] => {
    const c = Math.ceil(this.totalItemsCount() / this.perPage());
    const p = this.currentPage() || 1;
    const pagesToShow = this.pagesToShow() || 9;
    const pages: number[] = [];
    pages.push(p);
    const times = pagesToShow - 1;
    for (let i = 0; i < times; i++) {
      if (pages.length < pagesToShow) {
        if (Math.min.apply(null, pages) > 1) {
          pages.push(Math.min.apply(null, pages) - 1);
        }
      }
      if (pages.length < pagesToShow) {
        if (Math.max.apply(null, pages) < c) {
          pages.push(Math.max.apply(null, pages) + 1);
        }
      }
    }
    pages.sort((a, b) => a - b);
    return pages;
  }
}
