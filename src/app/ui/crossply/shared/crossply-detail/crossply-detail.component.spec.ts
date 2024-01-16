import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossplyDetailComponent } from './crossply-detail.component';

describe('CrossplyDetailComponent', () => {
  let component: CrossplyDetailComponent;
  let fixture: ComponentFixture<CrossplyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrossplyDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrossplyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
