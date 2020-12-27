import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-new-classes-dialog',
  templateUrl: './new-classes-dialog.component.html',
  styleUrls: ['./new-classes-dialog.component.css'],
})
export class NewClassesDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<NewClassesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
  }

  ngOnInit(): void {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
