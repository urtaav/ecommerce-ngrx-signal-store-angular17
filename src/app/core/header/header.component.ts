import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { shopStore } from '../../store/shop/shop.store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  readonly store = inject(shopStore);
}
