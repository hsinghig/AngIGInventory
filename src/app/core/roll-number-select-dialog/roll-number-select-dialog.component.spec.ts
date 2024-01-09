import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollNumberSelectDialogComponent } from './roll-number-select-dialog.component';

describe('RollNumberSelectDialogComponent', () => {
  let component: RollNumberSelectDialogComponent;
  let fixture: ComponentFixture<RollNumberSelectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RollNumberSelectDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RollNumberSelectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
