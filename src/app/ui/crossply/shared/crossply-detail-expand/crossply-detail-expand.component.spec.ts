import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossplyDetailExpandComponent } from './crossply-detail-expand.component';

describe('CrossplyDetailExpandComponent', () => {
  let component: CrossplyDetailExpandComponent;
  let fixture: ComponentFixture<CrossplyDetailExpandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrossplyDetailExpandComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrossplyDetailExpandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
