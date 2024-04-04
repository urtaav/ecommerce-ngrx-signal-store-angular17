import { Component, effect, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductComponent } from '../product/product.component';
import { Product } from '../../core/models/Product';
import { NgClass } from '@angular/common';
import { shopStore } from '../../store/shop/shop.store';
import { LayoutModeComponent } from '../../core/layout-mode/layout-mode.component';
import { PaginationComponent } from '../../pagination/pagination.component';
import { PaginationPipe } from '../../pagination/pagination.pipe';
import { Order } from '../../core/enums/order';
import { brandPurePipe } from '../../core/pure-pipes/brand.pure.pipe';
import { orderByPricePurePipe } from '../../core/pure-pipes/order-by-price.pure.pipe';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductComponent,NgClass,LayoutModeComponent,PaginationComponent,PaginationPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent  implements OnInit,OnDestroy{

  shop!: { products: Product[], cart: Product[] };
  products:WritableSignal<Product[]> = signal<Product[]>([]);

  colValue = signal('col-lg-4');
  gridValue = signal(3);
  perPage = signal(5);
  currentPage = signal(1);
  pagesToShow = signal(3);

  readonly store = inject(shopStore);
  
  constructor() {
      effect(() => {

        const brands =  this.store.brandFilter();
        const orderBy = this.store.orderBy() as Order;
        const filterByBrandArr = brandPurePipe(this.store.shop.products(), brands);
        const filterByOrderArr = orderByPricePurePipe(filterByBrandArr, orderBy);
        this.products.set(filterByOrderArr);
      },{
        allowSignalWrites: true
    })
  }
 
  ngOnInit(): void {
      this.products.set(this.store.shop.products());
  }

  onChangeLayout = (n: number): void => {
    this.gridValue.set(n);
    if (n === 4) {
      this.colValue.set(`col-lg-${3}`);
    } else {
      this.colValue.set(`col-lg-${4}`)
    }
  }

  next() {
    this.currentPage.update((page) => page + 1);
  }

  prev() {
    if (this.currentPage() === 1) return;
    this.currentPage.update((page) => page - 1);
  }

  goToPage(loc: number): void {
    this.currentPage.set(loc)
  }

  ngOnDestroy(): void {
    this.store.removeAllFilters()
  }
  
}
