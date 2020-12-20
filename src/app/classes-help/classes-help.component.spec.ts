import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesHelpComponent } from './classes-help.component';

describe('ClassesHelpComponent', () => {
  let component: ClassesHelpComponent;
  let fixture: ComponentFixture<ClassesHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassesHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassesHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
