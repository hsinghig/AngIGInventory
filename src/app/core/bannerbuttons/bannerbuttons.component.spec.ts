import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerbuttonsComponent } from './bannerbuttons.component';

describe('BannerbuttonsComponent', () => {
  let component: BannerbuttonsComponent;
  let fixture: ComponentFixture<BannerbuttonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerbuttonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BannerbuttonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
