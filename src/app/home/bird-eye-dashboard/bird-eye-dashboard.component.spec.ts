import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirdEyeDashboardComponent } from './bird-eye-dashboard.component';

describe('BirdEyeDashboardComponent', () => {
  let component: BirdEyeDashboardComponent;
  let fixture: ComponentFixture<BirdEyeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BirdEyeDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BirdEyeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
