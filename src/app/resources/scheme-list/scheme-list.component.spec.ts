import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemeListComponent } from './scheme-list.component';

describe('SchemeListComponent', () => {
  let component: SchemeListComponent;
  let fixture: ComponentFixture<SchemeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchemeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
