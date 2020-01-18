import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomBComponent } from './custom-b.component';

describe('CustomBComponent', () => {
  let component: CustomBComponent;
  let fixture: ComponentFixture<CustomBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomBComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
