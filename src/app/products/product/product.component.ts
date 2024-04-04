import { Component, ElementRef, inject, input, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { Product } from '../../core/models/Product';
import { shopStore } from '../../store/shop/shop.store';
import { EventTypes } from '../../core/enums/event-types';
import { cumulativeOffSet } from '../../utilities/cumulativeOffset';
import { RouterLink } from '@angular/router';
import { PriceFormatterPipe } from '../../core/pipes/price-formatter.pipe';
import { ProductSliderDotsComponent } from '../product-slider-dots/product-slider-dots.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink,PriceFormatterPipe,ProductSliderDotsComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  product = input<Product>(
    {
      title: '',
      category: '',
      images: [],
      brand: '',
      price: 0,
      cpu: '',
      camera: '',
      size: '',
      weight: '',
      display: '',
      battery: '',
      memory: '',
      id: 0,
      description: ''
    }
  );
  @ViewChild('productImageContainer') productImageContainer!: ElementRef;

  readonly store = inject(shopStore);

  currentImage = signal<string | undefined>('');
  currentImageIndex = signal<number>(0);
  productImageContainerClientWidth:any;
  offSetLeft = signal<number>(0);
  offSetTop = signal<number>(0);


  ngOnInit(): void {
    this.currentImage.set(this.product()?.images[0]);
    this.currentImageIndex.set(0);
  }

  onImageChange = (e: any): void => {
    // console.log(e);
    const eventType = e.type as EventTypes;
    let clientX;
    this.calculateOffSetLeftAndTop(eventType);

    if (eventType === EventTypes.TOUCH_MOVE) {
      clientX = e.touches[0].clientX;
    } else if (eventType === EventTypes.MOUSE_MOVE) {
      clientX = e.clientX;
    }
    const currentX = clientX - this.offSetLeft();
    const imgArrLength = this.product()?.images.length;

    const part = this.productImageContainerClientWidth / imgArrLength!;

    let imgIndex = Math.ceil(currentX / part) - 1;
    if (imgIndex < 0) {
      imgIndex = 0;
    }

    if (imgIndex >= imgArrLength!) {
      imgIndex = imgArrLength! - 1;
    }

    this.currentImageIndex.set(imgIndex)
    this.currentImage.set(this.product()?.images[imgIndex]);

  }
  onImageMouseOut(e: Event): void {
    this.currentImage.set(this.product()?.images[0]);
  }

  onChangeImage(n: number): void {
    this.currentImage.set(this.product()?.images[n]);
  }

  onAddProductToCart(): void {
    this.store.addProductToCart(this.product()!);
  }


  calculateOffSetLeftAndTop = (eventType: EventTypes): void => {
    const offSetTopAndLeft = cumulativeOffSet(this.productImageContainer.nativeElement, eventType);
    this.offSetLeft.set(offSetTopAndLeft.left);
    this.offSetTop.set(offSetTopAndLeft.top);
    this.productImageContainerClientWidth = this.productImageContainer.nativeElement.clientWidth;
  }


}
