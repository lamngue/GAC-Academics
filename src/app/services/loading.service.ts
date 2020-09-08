import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoadingDialogContentComponent } from 'src/app/loading-dialog-content/loading-dialog-content.component';

@Injectable()
export class LoadingService {

  loading = false;
  dialogRef;
  constructor(public dialog: MatDialog) { }

  setLoading(loading: boolean) {
    this.loading = loading;
    if (this.loading) {
      this.dialogRef = this.dialog.open(LoadingDialogContentComponent);
    }
  }

  unSetLoading(loading: boolean) {
    this.loading = loading;
    if (!this.loading) {
      this.dialogRef.close();
    }
  }
}
