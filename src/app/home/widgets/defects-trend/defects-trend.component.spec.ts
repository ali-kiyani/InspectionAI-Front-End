import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefectsTrendComponent } from './defects-trend.component';

describe('DefectsTrendComponent', () => {
  let component: DefectsTrendComponent;
  let fixture: ComponentFixture<DefectsTrendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefectsTrendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefectsTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
