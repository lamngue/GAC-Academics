import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoadingDialogContentComponent } from 'src/app/loading-dialog-content/loading-dialog-content.component';

@Injectable()
export class LoadingService {

  dialogRef;
  constructor(public dialog: MatDialog) { }

  setLoading(loading: boolean) {
    if (loading) {
        this.dialogRef = this.dialog.open(LoadingDialogContentComponent);
    } else {
        this.dialogRef.close();
    }
  }
}
