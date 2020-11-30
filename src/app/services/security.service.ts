import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  private authorizeEndPoint = '/oauth2/authorization/google';
  private tokenEndpoint = '/login/oauth2/code/google';
  private baseUrl = environment.baseUrl;
  private tokenKey = 'token';

  constructor(private http: HttpClient, private router: Router) { }

  login() {
    const newWindow = window.open("", "_self");
    newWindow.location.assign(this.baseUrl + this.authorizeEndPoint);
  }

  logout(): Observable<any> {
    return this.http.post(this.baseUrl + '/logout', this.getToken());
  }

  removeToken() {
    localStorage.removeItem(this.tokenKey);
  }

  updateToken(token) {
    localStorage.setItem(this.tokenKey, token);
  }

  fetchToken(code, state): Observable<any> {
    return this.http.get(this.baseUrl + this.tokenEndpoint + "?code=" + code + "&state=" + state);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn() {
    const token = this.getToken();
    return token != null;
  }
}
