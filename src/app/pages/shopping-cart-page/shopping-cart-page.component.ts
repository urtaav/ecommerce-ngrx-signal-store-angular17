import { Component } from '@angular/core';
import { ShoppingCartContainerComponent } from '../../shopping-cart/shopping-cart-container/shopping-cart-container.component';

@Component({
  selector: 'app-shopping-cart-page',
  standalone: true,
  imports: [ShoppingCartContainerComponent],
  templateUrl: './shopping-cart-page.component.html',
  styleUrl: './shopping-cart-page.component.scss'
})
export class ShoppingCartPageComponent {

}
