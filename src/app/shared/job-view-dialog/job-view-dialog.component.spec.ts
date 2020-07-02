import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobViewDialogComponent } from './job-view-dialog.component';

describe('JobViewDialogComponent', () => {
  let component: JobViewDialogComponent;
  let fixture: ComponentFixture<JobViewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobViewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
