import { Location } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/student';
import { NewClassesDialogComponent } from '../new-classes-dialog/new-classes-dialog.component';

@Component({
  selector: 'app-classes-planning',
  templateUrl: './classes-planning.component.html',
  styleUrls: ['./classes-planning.component.css'],
})
export class ClassesPlanningComponent implements OnInit, AfterViewInit {
  studentId: string;
  startYear: number;
  private MAXIMUM_CLASSES_SEM = 6;
  private MAXMIMUM_SEMESTER = 15;
  endYear: number;
  classes: any[];
  courses: string[] = [];
  dateProcessed: string[];
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private studentService: StudentService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.studentId = this.route.snapshot.paramMap.get('id');
  }

  ngAfterViewInit(): void {
    this.getStudent().subscribe((student) => {
      this.classes = student['classesPlan'];
      this.processDate(student.startDate, student.endDate);
    });
  }

  getStudent(): Observable<Student> {
    return this.studentService.getStudent(this.studentId);
  }

  goBack(): void {
    this.location.back();
  }

  processDate(date1: string, date2: string) {
    const d1 = date1
      .split("/").map(e => parseInt(e));
    const d2 = date2
      .split("/").map(e => parseInt(e));
    this.startYear = d1[2];
    this.endYear = d2[2];
    const yearRange = this.endYear - this.startYear;
    let dateProcessed = [];
    let semester = '';
    let i = 0;

    if (d1[0] >= 9 && d1[0] <= 12) {
      semester = 'Fall ' + d1[2];
      dateProcessed.push(semester);
      d1[2]++;
      i++;
    } else if (d1[0] >= 2 && d1[0] <= 5) {
      semester = 'Spring ' + d1[2];
      dateProcessed.push(semester);
      semester = 'Fall ' + d1[2];
      dateProcessed.push(semester);
      d1[2]++;
      i += 2;
    }
    for (let i = 1; i < yearRange; i++) {
      semester = 'J-Term ' + d1[2];
      dateProcessed.push(semester);
      semester = 'Spring ' + d1[2];
      dateProcessed.push(semester);
      semester = 'Fall ' + d1[2];
      dateProcessed.push(semester);
      d1[2]++;
    }
    if (d2[0] === 1) {
      semester = 'J-Term ' + d2[2];
      dateProcessed.push(semester);
    } else if (d2[0] >= 2 && d2[0] <= 5) {
      semester = 'J-Term ' + d2[2];
      dateProcessed.push(semester);
      semester = 'Spring ' + d2[2];
      dateProcessed.push(semester);
    } else if (d2[0] >= 9 && d2[0] <= 12) {
      semester = 'J-Term ' + d2[2];
      dateProcessed.push(semester);
      semester = 'Spring ' + d2[2];
      dateProcessed.push(semester);
      semester = 'Fall ' + d2[2];
      dateProcessed.push(semester);
    }
    this.studentService.addClassesPlan(this.studentId, dateProcessed).subscribe(() => {
      this.dateProcessed = dateProcessed;
    });
  }

  openDialog(sem: string): void {
    const semesterCourses = this.classes.find(c => c['semester'] === sem);
    const numberOfClasses = semesterCourses ? semesterCourses['course'].length : 0;
    const dialogRef = this.dialog.open(NewClassesDialogComponent, {
      width: '400px',
      data: numberOfClasses > this.MAXIMUM_CLASSES_SEM ? { semester: sem, numberOfClasses } : { semester: sem, course: '' }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        result['course'] = [result['course']];       
        this.courses.push(result);    
        this.studentService.addClasses(this.studentId, sem, this.courses).subscribe(() => {
           this.courses = [];
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(["home-page/semester-planning/" + this.studentId]);
          });
        });
      }
    });

  }

  deleteClass(sem: string, c: string) {
    const dialogRef = this.dialog.open(NewClassesDialogComponent, {
      width: '400px',
      data: { deleteMsg: "Are you sure you want to delete " + c }
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.studentService.deleteClasses(this.studentId, c, sem).subscribe(() => {
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(["home-page/semester-planning/" + this.studentId]);
          });
        })
      }
    })
  }

  addNewSemester(studentId: string) {
    if (this.dateProcessed.length >= this.MAXMIMUM_SEMESTER) {
      const dialogRef = this.dialog.open(NewClassesDialogComponent, {
        width: '400px',
        data: { semOverflowMsg: "Our schedule allows no more than " + this.MAXMIMUM_SEMESTER + " semester" }
      });
      return;
    }
    this.studentService.addNewSemester(studentId).subscribe(() => {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(["home-page/semester-planning/" + this.studentId]);
      });
    });
  }
}
