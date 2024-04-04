import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutModeComponent } from './layout-mode.component';

describe('LayoutModeComponent', () => {
  let component: LayoutModeComponent;
  let fixture: ComponentFixture<LayoutModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutModeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LayoutModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
