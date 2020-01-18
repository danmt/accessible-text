import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomAComponent } from './custom-a.component';

describe('CustomAComponent', () => {
  let component: CustomAComponent;
  let fixture: ComponentFixture<CustomAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomAComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
