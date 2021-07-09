import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ICar} from '../../interfaces/car.interface';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-manage-car-dialog',
  templateUrl: './manage-car-dialog.component.html',
  styleUrls: ['./manage-car-dialog.component.scss']
})
export class ManageCarDialogComponent implements OnInit {
  editMode = false;
  car: ICar;
  carForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<ManageCarDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if (this.data) {
      this.car = this.data;
      this.editMode = true;
      this.carForm = new FormGroup({
        name: new FormControl(this.data.name, Validators.required),
        productionYear: new FormControl(this.data.production_year, [Validators.required, Validators.min(1850), Validators.max(new Date().getFullYear())]),
      });
    } else {
      this.carForm = new FormGroup({
        name: new FormControl(null, Validators.required),
        productionYear: new FormControl(null, [Validators.required, Validators.min(1850), Validators.max(new Date().getFullYear())]),
      });
    }
  }

  manageCar() {
    if (this.carForm.get('name').hasError('required')) {
      return;
    }

    if (this.carForm.get('productionYear').hasError('required')) {
      return;
    }

    if (this.carForm.get('productionYear').hasError('min')) {
      return;
    }

    if (this.carForm.get('productionYear').hasError('max')) {

      return false;
    }

    this.dialogRef.close({name: this.carForm.value.name, productionYear: this.carForm.value.productionYear});
  }

  cancel() {
    this.dialogRef.close();
  }
}
