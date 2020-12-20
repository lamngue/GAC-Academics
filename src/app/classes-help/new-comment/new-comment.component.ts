import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.css']
})
export class NewCommentComponent implements OnInit {

  commentForm;

  constructor(
    private formBuilder:FormBuilder,
    public dialogRef: MatDialogRef<NewCommentComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.required]
    });
   }

  matcher = new MyErrorStateMatcher();

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}