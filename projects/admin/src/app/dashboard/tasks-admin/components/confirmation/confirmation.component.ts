import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent {

  constructor(private dialogRef: MatDialogRef<ConfirmationComponent>,
    private dialog : MatDialog) {

  }
  confirm() {
    this.dialog.closeAll();
  }

  close() {
    this.dialogRef.close()
  }
}
