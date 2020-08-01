import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomQuizComponent } from './custom-quiz.component';

describe('CustomQuizComponent', () => {
  let component: CustomQuizComponent;
  let fixture: ComponentFixture<CustomQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
