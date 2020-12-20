import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { SecurityService } from '../services/security.service';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  name: string;
  faGraduationCap = faGraduationCap;
  studentId = null;
  constructor(
    private http: HttpClient,
    private securityService: SecurityService,
    private router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getUserInfo().subscribe((data) => {
      this.name = data['name']['name'];
      this.setStudentId(data['name']['sub']);
    });
  }

  setStudentId(id: string): void {
    this.studentId = id;
  }

  getUserInfo(): Observable<any> {
    return this.http.get(environment.baseUrl + '/v1/home');
  }

  getTime(): String {
    const curHour = moment().hour();
    let message = "";
    switch(true) {
      case curHour >= 0 && curHour < 12:
        message = "Morning";
        break;
      case curHour >= 12 && curHour < 18:
        message = "Afternoon";
        break;
      default: 
        message = "Evening";
        break;
    }
    return message;
  }

  logout() {
    this.securityService.logout().subscribe(() => {
      this.securityService.removeToken();
      this.name = '';
      this.router.navigate(['/login']);
    });;
  }
}
