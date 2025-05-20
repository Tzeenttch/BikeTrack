import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

//Datos del usuario en el token
export interface JwtPayload {
  sub: string; //Subject(en este caso es Email)
  exp: number; //Exp(Fecha de expiracion)
  iat: number; //Fecha en la que el token fue creado
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  newUserCreate: boolean = false; //True en caso de que se llegue al login atraves delformulario de registro
  currentUser: any = null; //Usuario actual logeado

  private apiServerUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); //Hay que especificar el header para que envie un JSON
    return this.http.post(`${this.apiServerUrl}/auth/login`, body, { headers });
  }


  //Funcion para obtener datos del usuario que contiene el token con jwtDecode
  getUserFromToken(): JwtPayload | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      return jwtDecode<JwtPayload>(token);
    } catch (e) {
      return null;
    }
  }

  //Funcion para saber si hay un usuario logeado o no
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;

    //Validacion de fecha  expiracion del token
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded.exp && Date.now() >= decoded.exp * 1000) {
        return false;
      }
      return true;
    } catch {
      return false;
    }
  }

  //funcion para logout
  logout(): void {
    localStorage.removeItem("token");
    this.router.navigate(['/inicio']);
    window.location.reload();
  }


  //Guarda el usuario en la varaible currentUser
  loadCurrentUser() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.currentUser = null;
      return;
    }
    //Token añadido a la cabecera
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    this.http.get(`${this.apiServerUrl}/auth/me`, { headers }).subscribe({
      next: (user) => {
        this.currentUser = user;
      },
      error: () => {
        this.currentUser = null;
      }
    });
  }


  isAdmin(): string {
    return this.currentUser?.role;
  }

}
