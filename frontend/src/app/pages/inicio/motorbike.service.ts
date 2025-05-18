import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Motorbike } from '../../shared/models/motorbike';
import { environment } from '../../../environment/environment';

//Al usar este injectable no es necesario usarlo como provider en el comonente
@Injectable({
  providedIn: 'root'
})
export class MotorbikeService {
  private apiServerUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


  public getMotorbikes(): Observable<Motorbike[]> {
    return this.http.get<Motorbike[]>(`${this.apiServerUrl}/motorbike/all`);
  }

  public addMotorbike(motorbike: Motorbike): Observable<Motorbike> {
    return this.http.post<Motorbike>(`${this.apiServerUrl}/motorbike/add`, motorbike);
  }

  public updateMotorbike(motorbike: Motorbike): Observable<Motorbike> {
    return this.http.put<Motorbike>(`${this.apiServerUrl}/motorbike/update`, motorbike);
  }

  public deleteMotorbike(motorbikeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/motorbike/delete/${motorbikeId}`);
  }

}
