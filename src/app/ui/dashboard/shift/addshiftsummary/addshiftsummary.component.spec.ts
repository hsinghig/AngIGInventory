import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddshiftsummaryComponent } from './addshiftsummary.component';

describe('AddshiftsummaryComponent', () => {
  let component: AddshiftsummaryComponent;
  let fixture: ComponentFixture<AddshiftsummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddshiftsummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddshiftsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
