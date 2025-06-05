import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ContactModalComponent } from '../../shared/contact-modal/contact-modal.component';
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';
import { SuccessMessageComponent } from '../../shared/success-message/success-message.component';
import { ErrorMessageComponent } from '../../shared/error-message/error-message.component';
import { Motorbike } from '../../shared/models/motorbike';
import { MotorbikeService } from '../inicio/motorbike.service';
import { AuthService } from '../../auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-used-bikes',
  imports: [RouterModule, NgFor, NgIf, FormsModule, NgClass, ContactModalComponent, SearchBarComponent, SuccessMessageComponent, ErrorMessageComponent],
  templateUrl: './used-bikes.component.html',
  styleUrl: './used-bikes.component.css'
})
export class UsedBikesComponent {

  //Variables para el manejo del CRUD de motos y modales relacionados
  public motorbikes: Motorbike[] = [];
  public editMotorbike: any = null;
  modalType: 'add' | 'edit' | 'delete' | null = null;
  selectedMotorbike: any = null;
  deleteMotorbike: any = null;
  imageUrl: string = 'images/motorbikes/';
  successMessage: string = '';
  errorMessage: string = '';


  //Cuando se inicializa el componente llamara a la funcion para obtener los datos de las motos y del usuario logeado.
  ngOnInit(): void {
    this.getMotorbikes();
    this.getUserDisplay();
  }

  onSearchResults(results: any[]) {
    console.log(results);
    this.motorbikes = results;
  }


  isUserAdmin() {
    return this.authService.isAdmin();
  }

  getUserDisplay(): string {
    if (!this.authService.currentUser) {
      console.log("Usuario no encontrado")
      return 'Usuario no autenticado';
    }
    console.log(`Nombre: ${this.authService.currentUser.name}, Email: ${this.authService.currentUser.email}`)

    return `Nombre: ${this.authService.currentUser.name}, Email: ${this.authService.currentUser.email}`;
  }

  //Variables para modal de contacto
  showModal = false;

  openContactModal() {
    this.showModal = true;
  }

  openModal(motorbike: Motorbike, type: 'edit' | 'delete') {
    this.modalType = type;
    this.selectedMotorbike = { ...motorbike };

    //Al clickar en el boton de editar llamamos a esta funcion que al reconocer el "type" como "edit" va a entrar en este if donde guardara la moto que vamos a editar(pasada como parametro en la funcion) en la variable "editMotorbike".
    if (this.modalType == 'edit') {
      this.editMotorbike = motorbike;
    }

    if (this.modalType == 'delete') {
      this.deleteMotorbike = motorbike;
      console.log(this.deleteMotorbike)
    }

  }

  openModalAdd(type: 'add') {
    this.modalType = type;
  }

  closeModal() {
    this.modalType = null;
  }

  //Implementacion del servicio creado anteriormente para poder utilizar sus funciones aqui.
  constructor(private motobikeService: MotorbikeService, private authService: AuthService) { }

  public getMotorbikes(): void {
    //Utilizamos subscribe para que el observable devuelva los datos
    this.motobikeService.getMotorbikes().subscribe(
      (response: Motorbike[]) => {
        this.motorbikes = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        console.log("No hay motos")
      }
    )
  }

  getLicenseType(moto: Motorbike): string {
    if (moto.cc <= 49) {
      return 'AM';
    } else if (moto.cc <= 125) {
      return 'A1';
    }
    else if (moto.cc > 125 && moto.horsePower <= 95) {
      return 'A2, A';
    } else {
      return 'A';
    }
  }

  //Recordar: Uso de subscribe al trabajar con observables
  public onAddMotorbike(addForm: NgForm): void {
    document.getElementById('add-form-close-button')?.click();
    this.motobikeService.addMotorbike(addForm.value).subscribe(
      (response: Motorbike) => {
        this.successMessage = "Moto añadida exitosamente"
        setTimeout(() => {
          this.successMessage = '';
        }, 3000)
        this.getMotorbikes();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = "ERROR: No se ha podido añadir la moto"
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000)
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    )
  }

  public onUpdateMotorbike(motorbike: Motorbike): void {
    document.getElementById('update-form-close-button')?.click();
    this.motobikeService.updateMotorbike(motorbike).subscribe(
      (response: Motorbike) => {
        this.successMessage = "Moto editada exitosamente"
        setTimeout(() => {
          this.successMessage = '';
        }, 3000)
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.getMotorbikes();
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = "ERROR: No se ha podido actualizar la moto"
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000)
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    )
  }

  public onDeleteMotorbike(motorbikeId: number): void {
    document.getElementById('delete-close-button')?.click();
    this.motobikeService.deleteMotorbike(motorbikeId).subscribe(
      (response: void) => {
        this.successMessage = "Moto borrada exitosamente"
        setTimeout(() => {
          this.successMessage = '';
        }, 3000)
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.getMotorbikes();
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = "ERROR: No se ha podido eliminar la moto"
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000)
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    )
  }


  onSuccess(msg: string) {
    this.successMessage = msg;
    this.errorMessage = '';
    this.showModal = false;
    setTimeout(() => this.successMessage = '', 5000);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onError(msg: string) {
    this.errorMessage = msg;
    this.successMessage = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => this.errorMessage = '', 5000);
  }

}
