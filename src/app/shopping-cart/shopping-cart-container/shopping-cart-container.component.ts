import { Component, effect, inject, OnInit } from '@angular/core';
import { shopStore } from '../../store/shop/shop.store';
import { Product } from '../../core/models/Product';
import { ShoppingCartItemComponent } from '../shopping-cart-item/shopping-cart-item.component';
import { PriceFormatterPipe } from '../../core/pipes/price-formatter.pipe';

@Component({
  selector: 'app-shopping-cart-container',
  standalone: true,
  imports: [ShoppingCartItemComponent,PriceFormatterPipe],
  templateUrl: './shopping-cart-container.component.html',
  styleUrl: './shopping-cart-container.component.scss'
})
export class ShoppingCartContainerComponent implements OnInit {

  totalPrice!: number;
  cart!: Product[];

  readonly shopStore = inject(shopStore);

  constructor(){
    effect(() => {
      const cart = this.shopStore.shop().cart;
      this.totalPrice = cart.reduce((count, curItem) => {
        return count + (curItem.quantity! * curItem.price);
      }, 0);
  
      this.cart = cart;
    })
  }
  ngOnInit(): void {
   


  }

}
