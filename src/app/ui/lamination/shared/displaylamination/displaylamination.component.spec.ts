import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaylaminationComponent } from './displaylamination.component';

describe('DisplaylaminationComponent', () => {
  let component: DisplaylaminationComponent;
  let fixture: ComponentFixture<DisplaylaminationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplaylaminationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisplaylaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
