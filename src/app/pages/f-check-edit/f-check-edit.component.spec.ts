import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FCheckEditComponent } from './f-check-edit.component';

describe('FCheckEditComponent', () => {
  let component: FCheckEditComponent;
  let fixture: ComponentFixture<FCheckEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FCheckEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FCheckEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
