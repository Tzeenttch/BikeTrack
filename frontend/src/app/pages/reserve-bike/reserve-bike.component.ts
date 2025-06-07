import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Motorbike } from '../../shared/models/motorbike';
import { MotorbikeService } from '../inicio/motorbike.service';

@Component({
  selector: 'app-reserve-bike',
  imports: [FormsModule],
  templateUrl: './reserve-bike.component.html',
  styleUrl: './reserve-bike.component.css'
})
export class ReserveBikeComponent {

  motorbike!: Motorbike;
  formData = {
    name: '',
    email: '',
    address: '',
    number: ''
  };

  constructor(private route: ActivatedRoute, private motorbikeService: MotorbikeService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // "+" cambia de string a number
      this.motorbikeService.getMotorbikeById(+id).subscribe({
        next: (data: Motorbike) => {
          this.motorbike = data;
        }, error: (e) => {
          console.error("No se pudo obtener la moto", e);
        }
      })
    }

  }

  onSubmit() {
    if (this.formData.name && this.formData.email && this.formData.address && this.formData.number) {
      console.log('Formulario válido:', this.formData);
    }

  }
}
