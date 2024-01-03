import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtruderAllDataComponent } from './extruder-all-data.component';

describe('ExtruderAllDataComponent', () => {
  let component: ExtruderAllDataComponent;
  let fixture: ComponentFixture<ExtruderAllDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtruderAllDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExtruderAllDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
