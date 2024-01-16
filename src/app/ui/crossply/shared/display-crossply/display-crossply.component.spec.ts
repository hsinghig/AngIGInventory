import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCrossplyComponent } from './display-crossply.component';

describe('DisplayCrossplyComponent', () => {
  let component: DisplayCrossplyComponent;
  let fixture: ComponentFixture<DisplayCrossplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayCrossplyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisplayCrossplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
