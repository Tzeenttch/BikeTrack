import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ContactPageComponent } from './pages/contact/contact-page/contact-page.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions.component';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
    {path:'', component:InicioComponent, title:'BikeTrack - Inicio'},
    {path:'inicio', component:InicioComponent, title:'BikeTrack - Inicio'},
    {path:'login', component:LoginComponent, title:'BikeTrack - Login'},
    {path:'register', component:RegisterComponent, title:'BikeTrack - Crear cuenta'},
    {path:'contact-page', component:ContactPageComponent, title:'BikeTrack - Contacto'},
    {path:'privacy-policy', component:PrivacyPolicyComponent, title:'BikeTrack - Politicas de privacidad'},
    {path:'terms-and-conditions', component:TermsAndConditionsComponent, title:'BikeTrack - Terminos y condiciones'},
    {path:'about', component:AboutComponent, title:'BikeTrack - Sobre nosotros'}
];

