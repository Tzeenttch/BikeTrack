import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { ErrorMessageComponent } from "../../shared/error-message/error-message.component";

@Component({
  selector: 'app-register',
  imports: [RouterModule, ReactiveFormsModule, ErrorMessageComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  errorMessage: string = '';
  servErrorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }


  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  }, {
    validators: [
      (formGroup: AbstractControl) => {
        const passwordControl = formGroup.get('password');
        const confirmPasswordControl = formGroup.get('confirmPassword');
        return passwordControl?.value === confirmPasswordControl?.value ? null : { passwordNotMatch: true };
      },
    ]
  });

  handleSubmit() {
    if (this.form.valid) {
      const { name, email, password } = this.form.value;

      const payload = { name, email, password };

      this.http.post('http://172.22.227.158:8080/auth/register', payload).subscribe({
        next: (response) => {
          console.log('Usuario creado:', response);
          this.router.navigate(['/login'], { state: { message: 'Usuario creado con exito. Por favor inicie sesion' } }).then(() => {
            window.location.reload();
          });
        },
        error: (error) => {
          console.error('Error al crear usuario:', error);
          this.servErrorMessage = error.error.error; //Esto accede al mensaje de error que da el servidor
          this.errorMessage = "ERROR: No se ha podido crear el usuario";
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000)
          this.form.reset();
        }
      });
    } else {
      console.log('Formulario inválido');
      this.errorMessage = "ERROR: No se ha podido crear el usuario";
      this.form.reset();
    }
  }
}
