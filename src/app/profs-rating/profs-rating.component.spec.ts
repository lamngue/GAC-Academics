import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfsRatingComponent } from './profs-rating.component';

describe('ProfsRatingComponent', () => {
  let component: ProfsRatingComponent;
  let fixture: ComponentFixture<ProfsRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfsRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfsRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
