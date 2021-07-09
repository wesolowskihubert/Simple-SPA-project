import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ICar} from './interfaces/car.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiPath = environment.apiPath;

  constructor(private http: HttpClient) {}

  getAllCars(): Observable<ICar[]> {
    return this.http.get<ICar[]>(`${this.apiPath}/cars`);
  }

  updateCar(id, name, productionYear): Observable <boolean> {
    return this.http.put<boolean>(`${this.apiPath}/cars/${id}`, {name, productionYear});
  }

  addCar(name, productionYear): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiPath}/cars`, {name, productionYear});
  }

  deleteCar(id): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiPath}/cars/${id}`);
  }
}
