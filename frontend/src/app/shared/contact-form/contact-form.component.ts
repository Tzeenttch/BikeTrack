import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { ErrorMessageComponent } from "../error-message/error-message.component";
import { SuccessMessageComponent } from "../success-message/success-message.component";

@Component({
  selector: 'app-contact-form',
  imports: [FormsModule, ErrorMessageComponent, SuccessMessageComponent],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent {

private apiServerUrl = environment.apiUrl;

  contact = {
    email: '',
    phone: '',
    subject: '',
    message: ''
  };

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient) { }

  onSubmit() {

    this.http.post((`${this.apiServerUrl}/contact`), this.contact).subscribe({
      next: () => {
        this.successMessage = 'Hemos recibido tu mensaje, en breves nos pondremos en contacto con usted';
        setTimeout(() => this.successMessage = '', 5000);
        this.contact = {
          email: '',
          phone: '',
          subject: '',
          message: ''
        };
      },
      error: () => {
        console.log("Error al enviar");
        this.errorMessage = 'ERROR: No se ha podido enviar el mensaje';
        setTimeout(() => this.errorMessage = '', 5000);
      }
    });
  }

  resetForm(){
    this.contact.email = '';
    this.contact.phone = '';
    this.contact.subject = '';
    this.contact.message = '';
  }


}
