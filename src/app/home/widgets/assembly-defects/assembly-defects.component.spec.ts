import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssemblyDefectsComponent } from './assembly-defects.component';

describe('AssemblyDefectsComponent', () => {
  let component: AssemblyDefectsComponent;
  let fixture: ComponentFixture<AssemblyDefectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssemblyDefectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssemblyDefectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
