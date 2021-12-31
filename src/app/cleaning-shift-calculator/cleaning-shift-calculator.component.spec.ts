import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleaningShiftCalculatorComponent } from './cleaning-shift-calculator.component';

describe('CleaningShiftCalculatorComponent', () => {
  let component: CleaningShiftCalculatorComponent;
  let fixture: ComponentFixture<CleaningShiftCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CleaningShiftCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CleaningShiftCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

