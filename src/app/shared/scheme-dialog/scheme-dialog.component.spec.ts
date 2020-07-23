import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemeDialogComponent } from './scheme-dialog.component';

describe('SchemeDialogComponent', () => {
  let component: SchemeDialogComponent;
  let fixture: ComponentFixture<SchemeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchemeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
