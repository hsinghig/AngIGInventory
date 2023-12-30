import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLaminationComponent } from './add-lamination.component';

describe('AddLaminationComponent', () => {
  let component: AddLaminationComponent;
  let fixture: ComponentFixture<AddLaminationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddLaminationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddLaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
