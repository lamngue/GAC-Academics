import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesPlanningComponent } from './classes-planning.component';

describe('ClassesPlanningComponent', () => {
  let component: ClassesPlanningComponent;
  let fixture: ComponentFixture<ClassesPlanningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassesPlanningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassesPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
