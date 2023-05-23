import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingDialogContentComponent } from './loading-dialog-content.component';

describe('LoadingDialogContentComponent', () => {
  let component: LoadingDialogContentComponent;
  let fixture: ComponentFixture<LoadingDialogContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingDialogContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingDialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
