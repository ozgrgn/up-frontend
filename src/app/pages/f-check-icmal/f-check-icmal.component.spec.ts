import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FCheckIcmalComponent } from './f-check-icmal.component';

describe('FCheckIcmalComponent', () => {
  let component: FCheckIcmalComponent;
  let fixture: ComponentFixture<FCheckIcmalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FCheckIcmalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FCheckIcmalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
