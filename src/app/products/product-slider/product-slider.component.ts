import { Component, input, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-product-slider',
  standalone: true,
  imports: [],
  templateUrl: './product-slider.component.html',
  styleUrl: './product-slider.component.scss'
})
export class ProductSliderComponent implements OnInit{

  images = input.required<string[]>();
  currentImage = signal<string>('');

  ngOnInit() {
    this.currentImage.set(this.images()[0])
  }

  changeImage = (n: number): void => {
    this.currentImage.set(this.images()[n]);
  }

}
