import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  fb = inject(FormBuilder);

  form = this.fb.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],

  }, {
    validators:[
      //Validacion ambas contraseñas coinciden
      (formGroup: AbstractControl) => {
        const passwordControl = formGroup.get('password');
        const confirmPasswordControl = formGroup.get('confirmPassword');

        return passwordControl?.value === confirmPasswordControl?.value ? null : {passwordNotMatch: true};
      },
    ]
  });

  handleSubmit(){
    console.log(this.form);
  }

}
