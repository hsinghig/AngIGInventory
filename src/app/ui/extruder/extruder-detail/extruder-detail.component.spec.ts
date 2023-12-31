import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtruderDetailComponent } from './extruder-detail.component';

describe('ExtruderDetailComponent', () => {
  let component: ExtruderDetailComponent;
  let fixture: ComponentFixture<ExtruderDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtruderDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExtruderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
