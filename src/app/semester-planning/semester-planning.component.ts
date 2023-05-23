import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormControl,
  FormGroupDirective,
  NgForm, FormGroup, Form
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _moment from 'moment';
import { StudentService } from 'src/app/services/student.service';
import { Student } from '../student';
// tslint:disable-next-line:no-duplicate-imports
const moment = _moment;

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-semester-planning',
  templateUrl: './semester-planning.component.html',
  styleUrls: ['./semester-planning.component.css'],
})
export class SemesterPlanningComponent implements OnInit {
  dateForm;
  matcher = new MyErrorStateMatcher();
  studentId = '';
  dateValid = true;
  constructor(private studentService: StudentService, private router: Router, private route: ActivatedRoute) {
    this.dateForm = new FormGroup({
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.route
      .queryParams
      .subscribe(params => {
        // Defaults to '' if no query param provided.
        this.studentId = params['studentId'] || '';
      });
  }

  onSubmit(student: Student) {
    student['id'] = this.studentId;
    if (student['startDate'] && student['endDate']) {
      const startMonth = moment(student['startDate']).month() + 1;
      const endMonth = moment(student['endDate']).month() + 1;
      console.log(startMonth, endMonth);
      if (startMonth > 6  && startMonth < 9 || endMonth > 6 && endMonth < 9) {
        this.dateValid = false;
        return;
      }
      const startDate = moment(student['startDate']).format("MM/DD/YYYY");
      const endDate = moment(student['endDate']).format("MM/DD/YYYY");
      this.studentService.changeStartEndDate(this.studentId, startDate, endDate).subscribe((s) => {
        console.log(s);
        this.router.navigate(['home-page/semester-planning/' + this.studentId]);
      });
    }
  }
}
