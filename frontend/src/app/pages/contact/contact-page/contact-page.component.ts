import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContactModalComponent } from "../../../shared/contact-modal/contact-modal.component";
import { environment } from '../../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ContactFormComponent } from "../../../shared/contact-form/contact-form.component";
import { ErrorMessageComponent } from "../../../shared/error-message/error-message.component";
import { SuccessMessageComponent } from "../../../shared/success-message/success-message.component";

@Component({
  selector: 'app-contact-page',
  imports: [RouterModule, ContactModalComponent, FormsModule, ContactFormComponent, ErrorMessageComponent, SuccessMessageComponent],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.css'
})
export class ContactPageComponent {


  private apiServerUrl = environment.apiUrl;

  contact = {
    email: '',
    phone: '',
    subject: '',
    message: ''
  };

  successMessage: string = '';
  errorMessage: string = '';

  @Output() closeModal = new EventEmitter<void>();
  close() {
    this.closeModal.emit();
  }

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

}
