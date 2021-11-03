import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRefreshIntervalComponent } from './update-refresh-interval.component';

describe('UpdateRefreshIntervalComponent', () => {
  let component: UpdateRefreshIntervalComponent;
  let fixture: ComponentFixture<UpdateRefreshIntervalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateRefreshIntervalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRefreshIntervalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
