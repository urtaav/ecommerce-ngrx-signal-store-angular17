import { Component, inject, input, WritableSignal } from '@angular/core';
import { Product } from '../../core/models/Product';
import { shopStore } from '../../store/shop/shop.store';
import { PriceFormatterPipe } from '../../core/pipes/price-formatter.pipe';
import { ShortenTitlePipe } from '../../core/pipes/shorten-title.pipe';

@Component({
  selector: 'app-shopping-cart-item',
  standalone: true,
  imports: [PriceFormatterPipe,ShortenTitlePipe],
  templateUrl: './shopping-cart-item.component.html',
  styleUrl: './shopping-cart-item.component.scss'
})
export class ShoppingCartItemComponent {
  product = input.required<Product>();
  readonly shopStore = inject(shopStore);
  
  onIncrementCartItem = (): void => {
    this.shopStore.incrementCartItemQuantity(this.product().id)
  }

  onDecrementCartItem = (): void => {
    this.shopStore.decrementCartItemQuantity(this.product().id)
  }

  onRemoveCartItem = (): void => {
    this.shopStore.removeProductToCart(this.product().id)
  }



}
