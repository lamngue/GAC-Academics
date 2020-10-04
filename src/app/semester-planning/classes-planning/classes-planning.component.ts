import { Location } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/student';

@Component({
  selector: 'app-classes-planning',
  templateUrl: './classes-planning.component.html',
  styleUrls: ['./classes-planning.component.css']
})
export class ClassesPlanningComponent implements OnInit, AfterViewInit {

  studentId: string;
  student: Student;
  dateProcessed: string[];
  constructor(private location: Location, private route: ActivatedRoute, private studentService: StudentService, private router: Router) { 
  }

  ngOnInit(): void {
    this.studentId = this.route.snapshot.paramMap.get('id');
  }

  ngAfterViewInit(): void {
    this.getStudent().subscribe(student => {
      this.dateProcessed = this.processDate(student.startDate, student.endDate);
    })
  }

  getStudent(): Observable<Student> {
    return this.studentService.getStudent(this.studentId);
  }

  goBack(): void {
    this.location.back();
  }

  processDate(date1: string, date2: string) {

    const d1 = date1.split("T")[0].split("-").map(e => parseInt(e));
    const d2 = date2.split("T")[0].split("-").map(e => parseInt(e));
    const yearRange = d2[0] - d1[0];
    let dateProcessed = [];
    let semester = "";
    let i = 0;


    if (d1[1] >= 9 && d1[1] <= 12) {
      semester = "Fall " + d1[0];
      dateProcessed.push(semester);
      d1[0]++;
      i++;
    } else if (d1[1] >= 2 && d1[1] <= 5) {
      semester = "Spring " + d1[0];
      dateProcessed.push(semester);
      semester = "Fall " + d1[0];
      dateProcessed.push(semester);
      d1[0]++;
      i += 2;
    }
    for (let i = 1; i < yearRange; i++) {
      semester = " J-Term " + d1[0];
      dateProcessed.push(semester);
      semester = " Spring " + d1[0];
      dateProcessed.push(semester);
      semester = " Fall " + d1[0];
      dateProcessed.push(semester);
      d1[0]++;
    }
    if (d2[1] === 1) {
      semester = " J-Term " + d2[0];
      dateProcessed.push(semester);
    }
    else if (d2[1] >= 2 && d2[1] <= 5) {
      semester = " J-Term " + d2[0];
      dateProcessed.push(semester);
      semester = " Spring " + d2[0];
      dateProcessed.push(semester);
    } else if (d2[1] >= 9 && d2[1] <= 12) {
      semester = " J-Term " + d2[0];
      dateProcessed.push(semester);
      semester = "Spring " + d2[0];
      dateProcessed.push(semester);
      semester = "Fall " + d2[0];
      dateProcessed.push(semester);
    }
    return dateProcessed;
  }
}
