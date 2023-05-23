import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SecurityService } from './security.service';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient, 
    private securityService: SecurityService,
    public webSocketService: WebsocketService,
    private router: Router,
) { }


  getUserInfo(): Observable<any> {
    return this.http.get(environment.baseUrl + '/v1/home');
  }

  logout() {
    this.securityService.logout().subscribe(() => {
      this.webSocketService.closeSocket();
      this.securityService.removeToken();
      this.router.navigate(['/login']);
    });;
  }
}
