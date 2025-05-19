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

  showSuccess = false;
  showError = false;

  constructor(private http: HttpClient) { }


  onSubmit() {

    this.http.post((`${this.apiServerUrl}/contact`), this.contact).subscribe({
      next: () => {
        this.showSuccess = true;
        setTimeout(() => this.showSuccess = false, 3000);
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
        this.showError = true;
        setTimeout(() => this.showError = false, 3000);
      }
    });
  }

  @Output() closeModal = new EventEmitter<void>();
  close() {
    this.closeModal.emit();
  }

}
