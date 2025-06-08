import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { SalesService, Sale } from './sales.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
  imports: [], 
  standalone: true  
})
export class UserPageComponent implements OnInit {

  user: any = null;
  sales: Sale[] = [];

  constructor(private authService: AuthService, private salesService: SalesService) { }

  ngOnInit() {
    this.authService.loadCurrentUser();

    setTimeout(() => {
      this.user = this.authService.currentUser;
      console.log('Usuario cargado:', this.user);

      if (this.user?.id) {
        this.loadSales(this.user.id);
      }
    }, 300);
  }

 loadSales(userId: number) {
    this.salesService.getSalesByUserId(userId).subscribe({
      next: (sales) => {
        this.sales = sales;
        console.log('Ventas recibidas: ', sales);
      },
      error: (error) => console.error('Error cargando ventas: ', error),
    });
  }
}
