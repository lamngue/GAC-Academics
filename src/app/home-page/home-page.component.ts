import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { SecurityService } from '../services/security.service';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { StudentService } from '../services/student.service';
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
    console.log(this.securityService.getToken());
    return this.http.get(environment.baseUrl + '/v1/home');
  }

  logout() {
    this.securityService.logout();
  }
}
