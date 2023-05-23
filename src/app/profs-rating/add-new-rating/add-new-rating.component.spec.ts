import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewRatingComponent } from './add-new-rating.component';

describe('AddNewRatingComponent', () => {
  let component: AddNewRatingComponent;
  let fixture: ComponentFixture<AddNewRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
