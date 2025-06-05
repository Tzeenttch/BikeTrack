import { Component } from '@angular/core';
import { Motorbike } from '../../shared/models/motorbike';
import { ActivatedRoute } from '@angular/router';
import { MotorbikeService } from '../inicio/motorbike.service';

@Component({
  selector: 'app-motorbike-page',
  imports: [],
  templateUrl: './motorbike-page.component.html',
  styleUrl: './motorbike-page.component.css'
})
export class MotorbikePageComponent {

  motorbike!: Motorbike;

  constructor(private route: ActivatedRoute, private motorbikeService: MotorbikeService) { }

  ngOnInit(): void {

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

}
