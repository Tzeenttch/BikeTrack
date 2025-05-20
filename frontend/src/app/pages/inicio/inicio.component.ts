import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Motorbike } from '../../shared/models/motorbike';
import { MotorbikeService } from './motorbike.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { trigger, style, animate, transition, keyframes } from '@angular/animations';
import { ContactModalComponent } from "../../shared/contact-modal/contact-modal.component";
import { AuthService } from '../../auth/auth.service';
import { SearchBarComponent } from "../../shared/search-bar/search-bar.component";


@Component({
  standalone: true,
  selector: 'app-inicio',
  imports: [NgFor, NgIf, FormsModule, NgClass, ContactModalComponent, SearchBarComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
  animations: [
    //Animacion para entrada desde abajo hacia arriba
    trigger('fadeSlideUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('800ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
    //Animacion para entrada desde la izquierda
    trigger('fadeSlideLeft', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-15px)' }),
        animate('800ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ]),
  ]
})

export class InicioComponent implements OnInit {

  //Variables para el manejo del CRUD de motos y modales relacionados
  public motorbikes: Motorbike[] = [];
  public editMotorbike: any = null;
  modalType: 'add' | 'edit' | 'delete' | null = null;
  selectedMotorbike: any = null;
  deleteMotorbike: any = null;

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
      (respone: Motorbike) => {
        console.log(respone);
        this.getMotorbikes();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onUpdateMotorbike(motorbike: Motorbike): void {
    document.getElementById('update-form-close-button')?.click();
    this.motobikeService.updateMotorbike(motorbike).subscribe(
      (respone: Motorbike) => {
        console.log(respone);
        this.getMotorbikes();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onDeleteMotorbike(motorbikeId: number): void {
    document.getElementById('delete-close-button')?.click();
    this.motobikeService.deleteMotorbike(motorbikeId).subscribe(
      (respone: void) => {
        console.log(respone);
        this.getMotorbikes();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }


}
