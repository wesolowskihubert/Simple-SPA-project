import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-car-dialog',
  templateUrl: './delete-car-dialog.component.html',
  styleUrls: ['./delete-car-dialog.component.scss']
})
export class DeleteCarDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteCarDialogComponent>) { }

  ngOnInit(): void {
  }

  delete() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close();
  }
}
