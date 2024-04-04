import { Component, inject, OnInit, signal } from '@angular/core';
import { shopStore } from '../../store/shop/shop.store';

@Component({
  selector: 'app-brand-filter',
  standalone: true,
  imports: [],
  templateUrl: './brand-filter.component.html',
  styleUrl: './brand-filter.component.scss'
})
export class BrandFilterComponent implements OnInit {

  brands: string[] = [];
  brandItemsCount!: any;

  readonly store = inject(shopStore);


  ngOnInit(): void {

    const products = this.store.shop().products;
    const counts: any = {};
    const brandSet = new Set<string>();

    products.forEach(p => {
      const brandLowercase = p.brand.toLowerCase();
      brandSet.add(brandLowercase);
      counts[p.brand.toLowerCase()] = counts[p.brand.toLowerCase()] + 1 || 1;
    });

    this.brands = Array.from(brandSet);
    this.brandItemsCount = counts;

  }
  onChangeSelectBox = (e: any): void => {
    const name = e.target.name;
    const value = e.target.checked;

    if (value) {
      this.store.addBrandToFilter(name.toLowerCase());
    } else {
      this.store.removeBrandFromFilter(name.toLowerCase());
    }
  }
}
