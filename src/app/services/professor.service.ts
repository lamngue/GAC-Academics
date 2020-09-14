import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Professor } from '../professor';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProfessorService {

    private _baseUrl = "http://localhost:8080/api/professor/";
    constructor(private http: HttpClient) {}

    getProfessors(): Observable<Professor[]> {
        const professors = this.http.get<Professor[]>(this._baseUrl);
        return professors;
    }

    getProfessor(id: string): Observable<Professor> {
        const professor = this.http.get<Professor>(this._baseUrl + id);
        return professor;
    }

    addProfessorRating(id: string, rating: Object): Observable<any> {
        // get the professor, then modify the ratings of them, and make a put request
        return this.getProfessor(id).pipe(
            switchMap(professor => {
                if (!professor['ratings']) {
                    professor['ratings'] = [];
                }
                let ratings = professor['ratings'];
                ratings.push(rating);
                professor['ratings'] = ratings;
                return this.http.put<void>(this._baseUrl + id, professor, {
                    headers: new HttpHeaders({
                        'content-type': 'application/json'
                    })
                });
            })
        )
    }
}
