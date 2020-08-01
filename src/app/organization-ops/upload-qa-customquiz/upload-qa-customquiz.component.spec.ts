import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadQaCustomquizComponent } from './upload-qa-customquiz.component';

describe('UploadQaCustomquizComponent', () => {
  let component: UploadQaCustomquizComponent;
  let fixture: ComponentFixture<UploadQaCustomquizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadQaCustomquizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadQaCustomquizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
