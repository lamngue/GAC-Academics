import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesPerformanceComponent } from './classes-performance.component';

describe('ClassesPerformanceComponent', () => {
  let component: ClassesPerformanceComponent;
  let fixture: ComponentFixture<ClassesPerformanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassesPerformanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassesPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
