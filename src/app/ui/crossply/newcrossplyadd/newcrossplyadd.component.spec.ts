import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewcrossplyaddComponent } from './newcrossplyadd.component';

describe('NewcrossplyaddComponent', () => {
  let component: NewcrossplyaddComponent;
  let fixture: ComponentFixture<NewcrossplyaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewcrossplyaddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewcrossplyaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
