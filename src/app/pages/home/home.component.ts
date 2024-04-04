import { Component } from '@angular/core';
import { ProductListComponent } from '../../products/product-list/product-list.component';
import { BrandFilterComponent } from '../../filters/brand-filter/brand-filter.component';
import { PriceFilterComponent } from '../../filters/price-filter/price-filter.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductListComponent,BrandFilterComponent,PriceFilterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
