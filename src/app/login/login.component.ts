import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../services/security.service';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  faGraduationCap = faGraduationCap;
  constructor(private securityService: SecurityService, private router: Router) { }

  ngOnInit(): void {
    if (this.securityService.isLoggedIn()) {
      this.router.navigate(['/home-page']);
    }
  }

  login() {
    this.securityService.login();
  }
}
