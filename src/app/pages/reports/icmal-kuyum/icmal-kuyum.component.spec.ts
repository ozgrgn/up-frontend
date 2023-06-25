import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcmalKuyumComponent } from './icmal-kuyum.component';

describe('IcmalKuyumComponent', () => {
  let component: IcmalKuyumComponent;
  let fixture: ComponentFixture<IcmalKuyumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IcmalKuyumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IcmalKuyumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
