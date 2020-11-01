import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SecurityService } from '../services/security.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private securityService: SecurityService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(p => {
      if (p.hd === "gustavus.edu") {
        this.securityService.fetchToken(p.code, p.state).subscribe(data => {
          console.log(data.accessToken);
          this.securityService.updateToken(data.accessToken);
          this.router.navigate(['/home-page']);
        })
      } else {
        this.router.navigate(['/error'], { state: { errorMsg: "Sorry, you must login with an email from gustavus.edu domain. Please try again. Redirecting you to login."} });
      }
    });
  }

}
