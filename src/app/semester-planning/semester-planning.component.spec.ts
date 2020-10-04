import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemesterPlanningComponent } from './semester-planning.component';

describe('SemesterPlanningComponent', () => {
  let component: SemesterPlanningComponent;
  let fixture: ComponentFixture<SemesterPlanningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemesterPlanningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemesterPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
