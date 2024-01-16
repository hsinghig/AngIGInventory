import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaminationdetailComponent } from './laminationdetail.component';

describe('LaminationdetailComponent', () => {
  let component: LaminationdetailComponent;
  let fixture: ComponentFixture<LaminationdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaminationdetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LaminationdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
