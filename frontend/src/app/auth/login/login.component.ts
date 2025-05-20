import { Component } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { ErrorMessageComponent } from "../../shared/error-message/error-message.component";
import { SuccessMessageComponent } from "../../shared/success-message/success-message.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, FormsModule, ErrorMessageComponent, SuccessMessageComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  showError: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';


  constructor(private authService: AuthService, private router: Router) {
    //Uso NavigationExtras para recibir el mensaje desde register.component en caso de que se llegue al login al haber creado un usuario nuevo
    const nav = this.router.getCurrentNavigation();
    this.successMessage = nav?.extras.state?.['message'] || null;
    setTimeout(() => {
      this.successMessage = '';
    }, 3000)
  }


  onSubmit(form: NgForm) {
    const { email, password } = form.value;
    this.authService.login(email, password).subscribe({
      next: (response) => {
        console.log('Login exitoso', response);

        //Almacenamos el token en localStorage y los datos del usuario.
        localStorage.setItem('token', response.token);
        this.authService.loadCurrentUser()
        this.router.navigate(['/inicio']).then(() => {
          window.location.reload();
        });
      },
      error: (error) => {
        this.errorMessage = 'ERROR: La contraseño o el email no son correctos'
        form.reset();
        console.error('Error en login', error);
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000)
        const email = document.getElementById('email');
        const password = document.getElementById('password');

        if (password && email) {
          email.style.borderColor = 'red';
          email.style.borderWidth = '2px';
          email.style.borderStyle = 'solid';

          password.style.borderColor = 'red';
          password.style.borderWidth = '2px';
          password.style.borderStyle = 'solid';

          setTimeout(() => {
            email.style.borderColor = '';
            email.style.borderWidth = '';
            email.style.borderStyle = '';
            password.style.borderColor = '';
            password.style.borderWidth = '';
            password.style.borderStyle = '';
          }, 3000);
        }
      }
    });
  }



}
