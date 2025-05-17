import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Motorbike } from '../../shared/models/motorbike';
import { MotorbikeService } from './motorbike.service';

@Component({
  selector: 'app-inicio',
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
numeros = [1, 2, 3, 4, 5, 6];

  public motorbikes: Motorbike[] = [];

  //Implementacion del servicio creado anteriormente para poder utilizar sus funciones aqui.
  constructor(private motobikeService: MotorbikeService) { }

  public getMotorbikes():void {
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

}
