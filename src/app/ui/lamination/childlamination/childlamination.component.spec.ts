import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildlaminationComponent } from './childlamination.component';

describe('ChildlaminationComponent', () => {
  let component: ChildlaminationComponent;
  let fixture: ComponentFixture<ChildlaminationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildlaminationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChildlaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
