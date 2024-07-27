import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FCheckRatioComponent } from './f-check-ratio.component';

describe('FCheckRatioComponent', () => {
  let component: FCheckRatioComponent;
  let fixture: ComponentFixture<FCheckRatioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FCheckRatioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FCheckRatioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
