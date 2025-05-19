import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);

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
          alert("Correcto") //Modificar en un futuro

        },
        error: (error) => {
          console.error('Error al crear usuario:', error);
          alert("Error") //Modificar en un futuro
        }
      });
    } else {
      console.log('Formulario inválido');
    }
  }
}
