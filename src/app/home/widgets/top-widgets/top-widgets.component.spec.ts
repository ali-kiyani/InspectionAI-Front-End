import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopWidgetsComponent } from './top-widgets.component';

describe('TopDefectsComponent', () => {
  let component: TopWidgetsComponent;
  let fixture: ComponentFixture<TopWidgetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopWidgetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
