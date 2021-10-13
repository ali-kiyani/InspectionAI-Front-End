import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueLostComponent } from './revenue-lost.component';

describe('RevenueLostComponent', () => {
  let component: RevenueLostComponent;
  let fixture: ComponentFixture<RevenueLostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevenueLostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenueLostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
