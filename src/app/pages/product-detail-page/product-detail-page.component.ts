import { Component, effect, inject, Injector, Input, OnInit } from '@angular/core';
import { ProductSliderComponent } from '../../products/product-slider/product-slider.component';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../core/models/Product';
import { shopStore } from '../../store/shop/shop.store';
import { ProductDetailComponent } from '../../products/product-detail/product-detail.component';

@Component({
  selector: 'app-product-detail-page',
  standalone: true,
  imports: [ProductSliderComponent,ProductDetailComponent],
  templateUrl: './product-detail-page.component.html',
  styleUrl: './product-detail-page.component.scss'
})
export class ProductDetailPageComponent implements OnInit {

  // private route: ActivatedRoute = inject(ActivatedRoute);
  readonly shopStore = inject(shopStore);
  @Input() id = '';
  
  // id!: number;
  product!: Product;
  injector = inject(Injector);

  constructor() {

  }
  ngOnInit() {
    const store = this.shopStore.shop();
    for (let i = 0; i < store.products.length; i++) {
      if (store.products[i].id === +this.id) {
        this.product = store.products[i];
        break;
      }
    }

  }
}
