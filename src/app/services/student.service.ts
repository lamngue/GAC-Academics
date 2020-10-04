import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

}
