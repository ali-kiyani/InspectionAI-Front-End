import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDefectsComponent } from './product-defects.component';

describe('ProductDefectsComponent', () => {
  let component: ProductDefectsComponent;
  let fixture: ComponentFixture<ProductDefectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDefectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDefectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
