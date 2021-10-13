import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopDefectsComponent } from './top-defects.component';

describe('TopDefectsComponent', () => {
  let component: TopDefectsComponent;
  let fixture: ComponentFixture<TopDefectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopDefectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopDefectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
