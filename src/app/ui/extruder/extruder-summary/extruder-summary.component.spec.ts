import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtruderSummaryComponent } from './extruder-summary.component';

describe('ExtruderSummaryComponent', () => {
  let component: ExtruderSummaryComponent;
  let fixture: ComponentFixture<ExtruderSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtruderSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExtruderSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
