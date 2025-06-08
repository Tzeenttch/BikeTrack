import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

export interface Motorbike {
  id: number;
  brand: string;
  model: string;
  year: number;
  km: number;
  imageUrl: string;
  price: number;
  horsePower: number;
  cc: number;
  isNew: boolean;
  description: string;
  available: boolean;
  type: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  token: string;
}

export interface Sale {
  id: number;
  motorbike: Motorbike;
  customer: User;
  salesperson: User;
  saleDate: string;
  finalPrice: number;
}

//Para que este disponible par atoda la app
@Injectable({
  providedIn: 'root',
})

export class SalesService {
  private apiServerUrl = `${environment.apiUrl}/sales`;

  constructor(private http: HttpClient) {}

  getSalesByUserId(userId: number): Observable<Sale[]> {
    return this.http.get<Sale[]>(`${this.apiServerUrl}/user/${userId}`);
  }
}
