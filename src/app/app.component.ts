import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'any value';

  /**
   *
   */
  constructor(private dialog: MatDialog) {
  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: 1,
      title: 'Scegli qualcosa',
      message: ' Scegli ok o annulla'
    }

    this.dialog.open(DialogComponent, dialogConfig);
}
}
