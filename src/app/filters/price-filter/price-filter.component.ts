import { Component, inject } from '@angular/core';
import { Order } from '../../core/enums/order';
import { shopStore } from '../../store/shop/shop.store';

@Component({
  selector: 'app-price-filter',
  standalone: true,
  imports: [],
  templateUrl: './price-filter.component.html',
  styleUrl: './price-filter.component.scss'
})
export class PriceFilterComponent {

  selectedFilter = '';
  Order = Order;
  readonly priceFilterStore = inject(shopStore);

  onRadioButtonChange = (e:any):void => {
    const value = e.target.value;
    if (value === this.selectedFilter) {
      this.removefilters();
      return;
    }

    this.selectedFilter = value;

    if (value === Order.ASC) {
      this.priceFilterStore.orderByASC()
    } else {
      this.priceFilterStore.orderByDESC()
    }
  }

  removefilters = (): void => {
    const buttons: NodeListOf<HTMLInputElement> = document.getElementsByName('orderByPrice') as NodeListOf<HTMLInputElement>;

    buttons.forEach((el:HTMLInputElement) => {
      el.checked = false;
    });

    this.selectedFilter = '';
    this.priceFilterStore.clearOrderByPrice()
  }

}
