import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgPrefComponent } from './org-pref.component';

describe('OrgPrefComponent', () => {
  let component: OrgPrefComponent;
  let fixture: ComponentFixture<OrgPrefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgPrefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgPrefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
