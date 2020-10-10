import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Student } from "src/app/student";
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  studentId = '';
  constructor(private http: HttpClient) { }

  getStudents(): Observable<Student[]> {
    const students = this.http.get<Student[]>(
      environment.baseUrl + '/api/student'
    );
    return students;
  }

  getStudent(id: String): Observable<Student> {
    const student = this.http.get<Student>(environment.baseUrl + "/api/student/" + id);
    return student;
  }

  setStudentId(id: string): void {
    this.studentId = id;
  }

  getStudentId(): string {
    return this.studentId;
  }

  postStudent(student: Student): Observable<any> {
    return this.http.post(environment.baseUrl + "/api/student", student);
  }

  addClasses(id: string, classes): Observable<any> {
    // get the student, add classes to them, and make a put request
    return this.getStudent(id).pipe(
      switchMap(student => {
        let semester = student['classesPlan'].find(c => c['semester'] === classes[0]['semester']);
        let semesterIdx = student['classesPlan'].findIndex(c => c['semester'] === classes[0]['semester']);
        if (!semester || student['classesPlan'].length === 0) {
          student['classesPlan'].push(classes[0]);
        } else if (semester) {
          semester['course'].push(classes[0]['course'][0]);
          student['classesPlan'][semesterIdx] = semester;
        }
        return this.http.put<void>(
          environment.baseUrl + '/api/student/' + id,
          student,
          {
            headers: new HttpHeaders({
              'content-type': 'application/json',
            }),
          }
        )
       })
    )
  }

  deleteClasses(id: string, c: string, semester: string): Observable<any> {
    return this.getStudent(id).pipe(
      switchMap(student => {
        let sem = student['classesPlan'].find(s => s['semester'] === semester);
        let semesterIdx = student['classesPlan'].findIndex(c => c['semester'] === semester);
        sem['course'] = sem['course'].filter(course => course !== c);
        student['classesPlan'][semesterIdx] = sem;
        return this.http.put<void>(
          environment.baseUrl + '/api/student/' + id,
          student,
          {
            headers: new HttpHeaders({
              'content-type': 'application/json',
            }),
          }
        )
      })
    );
  }
}
