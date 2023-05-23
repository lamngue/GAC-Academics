import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Student } from "src/app/student";
import { environment } from 'src/environments/environment';
import * as _moment from 'moment';
const moment = _moment;

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  studentId = '';
  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    const students = this.http.get<Student[]>(
      environment.baseUrl + '/api/student'
    );
    return students;
  }

  getStudent(id: String): Observable<Student> {
    const student = this.http.get<Student>(
      environment.baseUrl + '/api/student/' + id
    );
    return student;
  }

  postStudent(student: Student): Observable<any> {
    return this.http.post(environment.baseUrl + '/api/student', student);
  }

  editStudent(id: string, student: Student): Observable<any> {
    return this.http.put(environment.baseUrl + '/api/student/' + id, student, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
      }),
    });
  }

  changeStartEndDate(id: string, startDate: string, endDate: string) {
    return this.getStudent(id).pipe(
      switchMap((student) => {
        student['startDate'] = startDate;
        student['endDate'] = endDate;
        return this.editStudent(id, student);
      })
    )
  }

  addClassesPlan(id: string, classes: any[]): Observable<any> {
    return this.getStudent(id).pipe(
      switchMap((student) => {
        classes = classes.map((c, i) => {
          return {
            semester: c,
            course: student['classesPlan'][i]
              ? student['classesPlan'][i]['course']
              : [],
          };
        });
        student['classesPlan'] = classes;
        return this.editStudent(id, student);
      })
    );
  }

  addClasses(id: string, sem: string, classes): Observable<any> {
    // get the student, add classes to them, and make a put request
    return this.getStudent(id).pipe(
      switchMap((student) => {
        let semester = student['classesPlan'].find(
          (c) => c['semester'] === sem
        );
        let semesterIdx = student['classesPlan'].findIndex(
          (c) => c['semester'] === sem
        );
        semester['course'].push(classes[0]['course'][0]);
        student['classesPlan'][semesterIdx] = semester;
        return this.editStudent(id, student);
      })
    );
  }

  deleteClasses(id: string, c: string, semester: string): Observable<any> {
    return this.getStudent(id).pipe(
      switchMap((student) => {
        let sem = student['classesPlan'].find(
          (s) => s['semester'] === semester
        );
        let semesterIdx = student['classesPlan'].findIndex(
          (c) => c['semester'] === semester
        );
        sem['course'] = sem['course'].filter((course) => course !== c);
        student['classesPlan'][semesterIdx] = sem;
        return this.editStudent(id, student);
      })
    );
  }

  addNewSemester(id: string): Observable<any> {
    return this.getStudent(id).pipe(
      switchMap((student) => {
        let gradDate = student.endDate;
        let gradMonth = moment(gradDate).month() + 1;
        let gradYear = moment(gradDate).year();
        if (gradMonth >= 2 && gradMonth <= 5) {
          gradMonth += 7;
        } else if (gradMonth >= 9 && gradMonth <= 12) {
          gradMonth = (gradMonth + 5) % 12;
          gradYear++;
        } else if (gradMonth == 1) {
          gradMonth += 4;
        }
        gradDate = moment(gradDate)
          .set('month', gradMonth - 1)
          .set('year', gradYear)
          .format('MM/DD/YYYY');
        student['endDate'] = gradDate;
        return this.editStudent(id, student);
      })
    );
  }
}
