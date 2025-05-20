import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {
  userIsLogged: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userIsLogged = this.authService.isLoggedIn();
  }

  //metodo de logout para usar el metodo de authService
  logout() {
    this.authService.logout();
  }

  isUserAdmin() {
    return this.authService.isAdmin();
  }

}
