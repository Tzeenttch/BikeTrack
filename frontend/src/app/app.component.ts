import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FooterComponent } from "./shared/footer/footer.component";
import { HeaderComponent } from "./shared/header/header.component";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [RouterOutlet, RouterModule, FooterComponent, HeaderComponent, HttpClientModule, FormsModule],
templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
