import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCrossplyComponent } from './add-crossply.component';

describe('AddCrossplyComponent', () => {
  let component: AddCrossplyComponent;
  let fixture: ComponentFixture<AddCrossplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCrossplyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCrossplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
