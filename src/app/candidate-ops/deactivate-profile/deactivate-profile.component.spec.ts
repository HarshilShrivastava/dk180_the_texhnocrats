import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactivateProfileComponent } from './deactivate-profile.component';

describe('DeactivateProfileComponent', () => {
  let component: DeactivateProfileComponent;
  let fixture: ComponentFixture<DeactivateProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeactivateProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeactivateProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
