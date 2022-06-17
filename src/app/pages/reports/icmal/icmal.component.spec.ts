import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcmalComponent } from './icmal.component';

describe('IcmalComponent', () => {
  let component: IcmalComponent;
  let fixture: ComponentFixture<IcmalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IcmalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IcmalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
