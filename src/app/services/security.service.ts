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
    let values = new Array();
    const oneday = new Date();
    oneday.setHours(oneday.getHours() + 3); //3 hours from now
    values.push(token);
    values.push(oneday);
    try {
      localStorage.setItem(this.tokenKey, values.join(';'));
    } catch (e) {
      console.log(e);
    }
  }

  fetchToken(code, state): Observable<any> {
    return this.http.get(this.baseUrl + this.tokenEndpoint + "?code=" + code + "&state=" + state);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey) ? localStorage.getItem(this.tokenKey).split(";")[0] : null;
  }

  getCookie(name: string) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
  }

  isLoggedIn() {
    //check if past expiration date
    const values = localStorage.getItem(this.tokenKey) ? localStorage.getItem(this.tokenKey).split(";") : null;
    if (values) {
      console.log(new Date(values[1]) + "    " + new Date());
      if (new Date(values[1]) < new Date()) {
        alert("You've been logged out since you've not logged out for 3 hours.")
        this.removeToken();
      }
    }
    return this.getToken() != null;
  }
}