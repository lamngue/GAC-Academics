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
      this.dateProcessed = this.processDate(student.startDate, student.endDate);
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
      .split('T')[0]
      .split('-')
      .map((e) => parseInt(e));
    const d2 = date2
      .split('T')[0]
      .split('-')
      .map((e) => parseInt(e));
    this.startYear = d1[0];
    this.endYear = d2[0];
    const yearRange = d2[0] - d1[0];
    let dateProcessed = [];
    let semester = '';
    let i = 0;

    if (d1[1] >= 9 && d1[1] <= 12) {
      semester = 'Fall ' + d1[0];
      dateProcessed.push(semester);
      d1[0]++;
      i++;
    } else if (d1[1] >= 2 && d1[1] <= 5) {
      semester = 'Spring ' + d1[0];
      dateProcessed.push(semester);
      semester = 'Fall ' + d1[0];
      dateProcessed.push(semester);
      d1[0]++;
      i += 2;
    }
    for (let i = 1; i < yearRange; i++) {
      semester = 'J-Term ' + d1[0];
      dateProcessed.push(semester);
      semester = 'Spring ' + d1[0];
      dateProcessed.push(semester);
      semester = 'Fall ' + d1[0];
      dateProcessed.push(semester);
      d1[0]++;
    }
    if (d2[1] === 1) {
      semester = 'J-Term ' + d2[0];
      dateProcessed.push(semester);
    } else if (d2[1] >= 2 && d2[1] <= 5) {
      semester = 'J-Term ' + d2[0];
      dateProcessed.push(semester);
      semester = 'Spring ' + d2[0];
      dateProcessed.push(semester);
    } else if (d2[1] >= 9 && d2[1] <= 12) {
      semester = 'J-Term ' + d2[0];
      dateProcessed.push(semester);
      semester = 'Spring ' + d2[0];
      dateProcessed.push(semester);
      semester = 'Fall ' + d2[0];
      dateProcessed.push(semester);
    }
    return dateProcessed;
  }

  openDialog(sem: string): void {
    const numberOfClasses = this.classes.find(c => c['semester'] === sem)['course'].length;
    const dialogRef = this.dialog.open(NewClassesDialogComponent, {
      width: '400px',
      data: numberOfClasses > this.MAXIMUM_CLASSES_SEM ? { semester: sem, numberOfClasses } : { semester: sem, course: '' }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        result['course'] = [result['course']];       
        this.courses.push(result);    
        this.studentService.addClasses(this.studentId, this.courses).subscribe(() => {
           this.courses = [];
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(["home-page/semester-planning/" + this.studentId]);
          });
        });
      }
    });

  }

  deleteClass(sem: string, c: string) {
    this.studentService.deleteClasses(this.studentId, c, sem).subscribe(() => {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(["home-page/semester-planning/" + this.studentId]);
      });
    })
  }
}
