import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDefectTrendComponent } from './product-defect-trend.component';

describe('ProductDefectTrendComponent', () => {
  let component: ProductDefectTrendComponent;
  let fixture: ComponentFixture<ProductDefectTrendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDefectTrendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDefectTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
