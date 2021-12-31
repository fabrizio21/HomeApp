import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBoxesComponent } from './home-boxes.component';

describe('HomeBoxesComponent', () => {
  let component: HomeBoxesComponent;
  let fixture: ComponentFixture<HomeBoxesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeBoxesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeBoxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
