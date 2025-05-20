import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ContactPageComponent } from './pages/contact/contact-page/contact-page.component';

export const routes: Routes = [
    {path:'', component:InicioComponent, title:'BikeTrack - Inicio'},
    {path:'inicio', component:InicioComponent, title:'BikeTrack - Inicio'},
    {path:'login', component:LoginComponent, title:'BikeTrack - Login'},
    {path:'register', component:RegisterComponent, title:'BikeTrack - Crear cuenta'},
    {path:'contact-page', component:ContactPageComponent, title:'BikeTrack - Contacto'},
];
