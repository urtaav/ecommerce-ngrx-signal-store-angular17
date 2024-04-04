import { Component, inject, input } from '@angular/core';
import { Product } from '../../core/models/Product';
import { shopStore } from '../../store/shop/shop.store';
import { PriceFormatterPipe } from '../../core/pipes/price-formatter.pipe';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [PriceFormatterPipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {

  product = input.required<Product>();
  readonly shopStore = inject(shopStore);

  onAddProductToCart = ():void => {
    this.shopStore.addProductToCart(this.product());
  }
}
