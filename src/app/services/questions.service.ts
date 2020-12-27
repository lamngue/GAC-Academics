import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Professor } from 'src/app/professor';
import { environment } from 'src/environments/environment';
import { Student } from '../student';
import { Question } from '../question';
import { Comment } from '../comment';

@Injectable({ providedIn: 'root' })
export class QuestionsService {
  constructor(private http: HttpClient) {}
  getQuestion(id: string): Observable<Question> {
    return this.http.get<Question>(
      environment.baseUrl + '/api/questions/' + id
    );
  }
  postQuestion(question: Question) {
    return this.http.post(environment.baseUrl + '/api/questions', question);
  }
  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(environment.baseUrl + '/api/questions');
  }
  deleteQuestion(id: string) {
    return this.http.delete(environment.baseUrl + '/api/questions/' + id);
  }

  postComment(id: string, comment: Comment) {
    return this.http.put(
      environment.baseUrl + '/api/questions/' + id,
      comment,
      {
        headers: new HttpHeaders({
          'content-type': 'application/json',
        }),
      }
    );
  }

  likeQuestion(id: string, student: Student): Observable<any> {
    return this.http.put(
      environment.baseUrl + '/api/questions/like/' + id,
      student,
      {
        headers: new HttpHeaders({
          'content-type': 'application/json',
        }),
      }
    );
  }

  unlikeQuestion(id: string, student: Student): Observable<any> {
    return this.http.put(
      environment.baseUrl + '/api/questions/unlike/' + id,
      student,
      {
        headers: new HttpHeaders({
          'content-type': 'application/json',
        }),
      }
    );
  }

  editComment(questionid: string, comment: Comment) {
    return this.http.put(
      environment.baseUrl + '/api/questions/edit-comment/' + questionid,
      comment,
      {
        headers: new HttpHeaders({
          'content-type': 'application/json',
        }),
      }
    );
  }
  deleteComment(questionid: string, commentid: string) {
    return this.http.put(
      environment.baseUrl + '/api/questions/delete-comment/' + questionid,
      commentid,
      {
        headers: new HttpHeaders({
          'content-type': 'application/json',
        }),
      }
    );
  }
}
