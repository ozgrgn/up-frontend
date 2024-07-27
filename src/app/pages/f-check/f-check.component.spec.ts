import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FCheckComponent } from './f-check.component';

describe('FCheckComponent', () => {
  let component: FCheckComponent;
  let fixture: ComponentFixture<FCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
