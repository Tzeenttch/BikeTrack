import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { environment } from '../../../environment/environment';

@Component({
  selector: 'app-contact-modal',
  imports: [NgIf, FormsModule],
  templateUrl: './contact-modal.component.html',
  styleUrl: './contact-modal.component.css'
})
export class ContactModalComponent {

  @Input() visible = false;
  private apiServerUrl = environment.apiUrl;

  contact = {
    email: '',
    phone: '',
    subject: '',
    message: ''
  };

  @Input() successMessage: string = '';
  @Input() errorMessage: string = '';

  @Output() formSubmitSuccess = new EventEmitter<string>();
  @Output() formSubmitError = new EventEmitter<string>();
  constructor(private http: HttpClient) { }


  onSubmit() {
    this.http.post((`${this.apiServerUrl}/contact`), this.contact).subscribe({
      next: () => {
        this.formSubmitSuccess.emit('Hemos recibido tu mensaje, en breves nos pondremos en contacto con usted');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.close();
        this.contact = {
          email: '',
          phone: '',
          subject: '',
          message: ''
        };
      },
      error: () => {
        console.log("Error al enviar");
        this.formSubmitError.emit('ERROR: No se ha podido enviar el mensaje');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  @Output() closeModal = new EventEmitter<void>();
  close() {
    this.closeModal.emit();
  }

}
