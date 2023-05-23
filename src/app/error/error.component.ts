import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit, AfterViewInit {

  errorMsg: string;
  constructor(private router: Router, private loadingService: LoadingService) { 
    this.errorMsg = this.router.getCurrentNavigation().extras.state['errorMsg'];
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    if (this.errorMsg) {
      this.loadingService.show();
      setTimeout(() => {
        this.loadingService.hide();
        this.router.navigate(['/login']);
      }, 3000);
    }
  }

}
