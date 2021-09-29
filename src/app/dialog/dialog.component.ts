import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  title: string = '';
  message: string = '';
  icon: string = '';
  form: FormGroup | any;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) data : any) { 
      this.title = data.title;
      this.message = data.message;
      this.icon = data.icon;
    }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [this.title, []],
      message: [this.message, []]
    })

    //this.dialogRef.updateSize('80%', '80%');
  }

  ok(){
    this.dialogRef.close("ok");
  }

  cancel(){
    this.dialogRef.close("cancel");
  }

}
