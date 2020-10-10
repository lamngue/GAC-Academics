import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewClassesDialogComponent } from './new-classes-dialog.component';

describe('NewClassesDialogComponent', () => {
  let component: NewClassesDialogComponent;
  let fixture: ComponentFixture<NewClassesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewClassesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewClassesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
