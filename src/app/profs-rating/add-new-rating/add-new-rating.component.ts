import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Professor } from 'src/app/professor';
import { ProfessorService } from 'src/app/services/professor.service';
import { FormControl, FormGroupDirective, NgForm, Validators, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import * as moment from 'moment';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-new-rating',
  templateUrl: './add-new-rating.component.html',
  styleUrls: ['./add-new-rating.component.css']
})

export class AddNewRatingComponent implements OnInit {

  professor: Professor;
  commentForm;

  constructor(private route: ActivatedRoute, 
    private formBuilder: FormBuilder,
    private professorService: ProfessorService,
    private location: Location) { 
      this.commentForm = this.formBuilder.group({
        course: ['', Validators.required],
        rating: ['', Validators.required],
        description: ['', Validators.required],
        currentGPA: ['', Validators.required],
        gradeReceived: ['', Validators.required]
      });
    }

  ngOnInit(): void {
    this.getProfessor();
  }

  getProfessor(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.professorService.getProfessor(id)
      .subscribe(prof => this.professor = prof);
  }

  goBack() {
    this.location.back();
  }

  matcher = new MyErrorStateMatcher();

  onSubmit(rating: Object) {
    const id = this.route.snapshot.paramMap.get('id');
    const date = moment();
    const dateString = ((date.month() > 8) ? (date.month() + 1) : ('0' + (date.month() + 1))) + '/' + ((date.date() > 9) ? date.date() : ('0' + date.date())) + '/' + date.year();
    rating['dateAdded'] = dateString;
    rating['currentGPA'] = parseFloat(rating['currentGPA']).toFixed(2).toString().replace(".", ",");
    this.professorService.addProfessorRating(id, rating).subscribe(res => this.goBack(), err => console.log(err));
  }
}
