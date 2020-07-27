import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowDecideComponent } from './flow-decide.component';

describe('FlowDecideComponent', () => {
  let component: FlowDecideComponent;
  let fixture: ComponentFixture<FlowDecideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowDecideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowDecideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
