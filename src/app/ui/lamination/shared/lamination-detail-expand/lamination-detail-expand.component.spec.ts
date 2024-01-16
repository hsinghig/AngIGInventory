import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaminationDetailExpandComponent } from './lamination-detail-expand.component';

describe('LaminationDetailExpandComponent', () => {
  let component: LaminationDetailExpandComponent;
  let fixture: ComponentFixture<LaminationDetailExpandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaminationDetailExpandComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LaminationDetailExpandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
