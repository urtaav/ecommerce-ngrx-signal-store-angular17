import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartContainerComponent } from './shopping-cart-container.component';

describe('ShoppingCartContainerComponent', () => {
  let component: ShoppingCartContainerComponent;
  let fixture: ComponentFixture<ShoppingCartContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingCartContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShoppingCartContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
