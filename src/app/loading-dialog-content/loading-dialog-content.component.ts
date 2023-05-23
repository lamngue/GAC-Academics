import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-loading-dialog-content',
  templateUrl: './loading-dialog-content.component.html',
  styleUrls: ['./loading-dialog-content.component.css']
})
export class LoadingDialogContentComponent implements OnInit {
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  isLoading: Subject<boolean> = this.loadingService.isLoading;

  constructor(private loadingService: LoadingService) { }

  ngOnInit(): void {
  }

}
