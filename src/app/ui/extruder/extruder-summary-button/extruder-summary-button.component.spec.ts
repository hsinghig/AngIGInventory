import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtruderSummaryButtonComponent } from './extruder-summary-button.component';

describe('ExtruderSummaryButtonComponent', () => {
  let component: ExtruderSummaryButtonComponent;
  let fixture: ComponentFixture<ExtruderSummaryButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtruderSummaryButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExtruderSummaryButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
