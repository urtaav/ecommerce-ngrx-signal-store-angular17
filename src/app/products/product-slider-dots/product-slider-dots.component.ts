import { Component, EventEmitter, input, OnInit, Output, signal, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-product-slider-dots',
  standalone: true,
  imports: [],
  templateUrl: './product-slider-dots.component.html',
  styleUrl: './product-slider-dots.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ProductSliderDotsComponent implements OnInit{

  len = input<number>(0);
  activeItem = input<number>();
  @Output('changeItem') changeItem = new EventEmitter<number>();

  dots = signal<number[]>([]);

  ngOnInit() {
    for (let i = 0; i < this.len(); i++) {
      this.dots().push(i);
    }
  }
}
