import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Motorbike } from '../../shared/models/motorbike';
import { MotorbikeService } from '../inicio/motorbike.service';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { environment } from '../../../environment/environment';

@Component({
  selector: 'app-reserve-bike',
  imports: [FormsModule, HttpClientModule],
  templateUrl: './reserve-bike.component.html',
  styleUrl: './reserve-bike.component.css'
})
export class ReserveBikeComponent {

  motorbike!: Motorbike;
  private apiServerUrl = environment.apiUrl;

  formData = {
    name: '',
    email: '',
    address: '',
    number: ''
  };

  constructor(private route: ActivatedRoute, private motorbikeService: MotorbikeService, private http: HttpClient) { }

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
    console.log("AHHHHHHHHHHH FUNCIONO")
    if (this.formData.name && this.formData.email && this.formData.address && this.formData.number) {
      const total = this.motorbike.price.toFixed(2);  
      const currency = 'EUR'; //Moneda utilizada en el pago
      this.http.post<{ orderId: string }>(
        `${this.apiServerUrl}/paypal/create-order?total=${total}&currency=${currency}`, 
        {}
      ).subscribe({
        next: (res) => {
          const orderId = res.orderId;
          //redirige a PayPal
          //la ruta debe de modificarse al salir de la fase de desarrollo por la ruta real de paypal
          window.location.href = `https://www.sandbox.paypal.com/checkoutnow?token=${orderId}`; 
        },
        error: (err) => {
          console.error('Error al crear la orden PayPal', err);
        }
      });
    }
  }

}
