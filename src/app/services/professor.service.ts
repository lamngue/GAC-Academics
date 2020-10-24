import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Professor } from 'src/app/professor';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ProfessorService {

    constructor(private http: HttpClient) {}

    getProfessors(): Observable<Professor[]> {
        const professors = this.http.get<Professor[]>(environment.baseUrl + "/api/professor");
        return professors;
    }

    getProfessor(id: string): Observable<Professor> {
        const professor = this.http.get<Professor>(
          environment.baseUrl + '/api/professor/' + id
        );
        return professor;
    }

    addProfessorRating(id: string, rating: Object): Observable<any> {
        return this.http.put<void>(
          environment.baseUrl + '/api/professor/' + id,
          rating,
          {
            headers: new HttpHeaders({
              'content-type': 'application/json',
          }),
        }
      );
    }
}
