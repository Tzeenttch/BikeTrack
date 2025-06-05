import { Component } from '@angular/core';
import { Motorbike } from '../../shared/models/motorbike';
import { ActivatedRoute } from '@angular/router';
import { MotorbikeService } from '../inicio/motorbike.service';
import { ContactFormComponent } from "../../shared/contact-form/contact-form.component";

@Component({
  selector: 'app-motorbike-page',
  imports: [ContactFormComponent],
  templateUrl: './motorbike-page.component.html',
  styleUrl: './motorbike-page.component.css'
})
export class MotorbikePageComponent {

  motorbike!: Motorbike;
  licenseType!: String;

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

}
