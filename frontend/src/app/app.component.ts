import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FooterComponent } from "./shared/footer/footer.component";
import { HeaderComponent } from "./shared/header/header.component";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth/auth.service';
import { CookieBannerComponent } from "./shared/cookie-banner/cookie-banner.component";


@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [RouterOutlet, RouterModule, FooterComponent, HeaderComponent, HttpClientModule, FormsModule, CookieBannerComponent],
templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'frontend';

  constructor(private authService: AuthService){}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.authService.loadCurrentUser();
    }
  }

}
