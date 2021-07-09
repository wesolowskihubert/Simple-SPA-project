import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../api.service';
import {ICar} from '../interfaces/car.interface';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DeleteCarDialogComponent} from './delete-car-dialog/delete-car-dialog.component';
import {ManageCarDialogComponent} from './manage-car-dialog/manage-car-dialog.component';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  cars: ICar[];

  displayedColumns = [
    'id',
    'name',
    'production_year',
    'action'
  ];

  dataSource: MatTableDataSource<ICar>;

  constructor(private apiService: ApiService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getAllCars();
  }

  getAllCars() {
    this.apiService.getAllCars().subscribe((cars: ICar[]) => {
      console.log('sadasd');
      this.cars = cars;
      this.dataSource = new MatTableDataSource(cars);
      this.dataSource.sort = this.sort;
    });
  }

  deleteCar(id: number) {
    this.openDeleteCarDialog().afterClosed().subscribe(isAccepted => {
      if (isAccepted) {
        this.apiService.deleteCar(id).subscribe(isDeleted => {
          console.log(isDeleted);
          if (isDeleted) {
            this.getAllCars();
          }
        });
      }
    });
  }

  addCar() {
    this.openManageCarDialog().afterClosed().subscribe(car => {
      if (car) {
        console.log(car);
        this.apiService.addCar(car.name, car.productionYear).subscribe(isAdded => {
          console.log(isAdded);
          this.getAllCars();
        });
      }
    });
  }

  editCar(element) {
    this.openManageCarDialog(element).afterClosed().subscribe(car => {
      if(car) {
        this.apiService.updateCar(element.id, car.name, car.productionYear).subscribe(isEdited => {
          if (isEdited) {
            this.getAllCars();
          }
        });
      }
    });
  }


  // open delete dialog
  openDeleteCarDialog(): MatDialogRef<DeleteCarDialogComponent, any> {
    return this.dialog.open(DeleteCarDialogComponent, {
      width: '400px'
    });
  }


  // open manage car dialog
  openManageCarDialog(element?): MatDialogRef<ManageCarDialogComponent, any> {
    return this.dialog.open(ManageCarDialogComponent, {
      width: '400px',
      data: element,
    });
  }
}
