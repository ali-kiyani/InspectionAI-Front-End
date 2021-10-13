import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRevenueLostComponent } from './product-revenue-lost.component';

describe('ProductRevenueLostComponent', () => {
  let component: ProductRevenueLostComponent;
  let fixture: ComponentFixture<ProductRevenueLostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductRevenueLostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRevenueLostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
