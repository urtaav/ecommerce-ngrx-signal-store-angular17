import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSliderDotsComponent } from './product-slider-dots.component';

describe('ProductSliderDotsComponent', () => {
  let component: ProductSliderDotsComponent;
  let fixture: ComponentFixture<ProductSliderDotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSliderDotsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductSliderDotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
