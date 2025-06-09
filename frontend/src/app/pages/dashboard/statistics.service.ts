import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

export interface SalesStatistic {
  label: string;
  count: number;
}

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private apiUrl = `${environment.apiUrl}/statistics`;

  constructor(private http: HttpClient) { }

  getTopBrands(): Observable<SalesStatistic[]> {
    return this.http.get<SalesStatistic[]>(`${this.apiUrl}/top-brands`);
  }

  getMostSoldMotorbikes(): Observable<SalesStatistic[]> {
    return this.http.get<SalesStatistic[]>(`${this.apiUrl}/most-sold`);
  }

  getLeastSoldMotorbikes(): Observable<SalesStatistic[]> {
    return this.http.get<SalesStatistic[]>(`${this.apiUrl}/least-sold`);
  }

  getMonthlySales(): Observable<SalesStatistic[]> {
    return this.http.get<SalesStatistic[]>(`${this.apiUrl}/monthly-sales`);
  }


}

