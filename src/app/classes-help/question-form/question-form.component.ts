import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { Professor } from 'src/app/professor';
import { FormControl, FormGroupDirective, NgForm, Validators, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { HomeService } from 'src/app/services/home.service';
import * as moment from 'moment';
import { QuestionsService } from 'src/app/services/questions.service';
import { Question } from 'src/app/question';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit {

  professor: Professor;
  studentId: string;
  studentName: string;
  questionForm;

  constructor(private formBuilder: FormBuilder,
    private homeService: HomeService,
    private questionsService: QuestionsService,
    private location: Location) { 
      this.questionForm = this.formBuilder.group({
        topic: ['', Validators.required],
        question: ['', Validators.required],
<<<<<<< HEAD
        content: ['', Validators.required ],
=======
        content: ['', Validators.required],
>>>>>>> 1028f179a9112269c6ff280b5338e5a25aa4a6f1
      });
    }

  ngOnInit(): void {
    this.getUserInfo().subscribe((data) => {
      this.studentName = data['name']['name'];
    });
  }

  getUserInfo(): Observable<any> {
    return this.homeService.getUserInfo();
  }

  goBack() {
    this.location.back();
  }

  matcher = new MyErrorStateMatcher();

  onSubmit(question: Question) {
    const date = moment();
    const dateString = ((date.month() > 8) ? (date.month() + 1) : ('0' + (date.month() + 1))) + '/' + ((date.date() > 9) ? date.date() : ('0' + date.date())) + '/' + date.year();
    question['dateAdded'] = dateString;
    question['by'] = this.studentName;
    question['comments'] = [];
    this.questionsService.postQuestion(question).subscribe(res => this.goBack(), err => console.log(err));
  }
}
