import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cookie-banner',
  imports: [NgIf],
  templateUrl: './cookie-banner.component.html',
  styleUrl: './cookie-banner.component.css'
})
export class CookieBannerComponent {


  showBanner: boolean = false;

  ngOnInit(): void{
    const consent = this.getCookie('consent_cookie');
    if(!consent){
      this.showBanner = true;
    }
  }

  acceptCookies(): void{
    this.setCookie('consent_cookie', 'accepted', 365);
      this.showBanner = false;
  }

  rejectCookies():void {
    this.setCookie('consent_cookie', 'rejected', 365);
    this.showBanner = false;
  }


  private setCookie(name: string, value: string, days: number): void {
    const expires = new Date(Date.now() + days * 864e5).toUTCString(); //Notacion cientfica para usar los mls en ts/js
    document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
  }

  private getCookie(name: string): string | null {
    const cookies = document.cookie.split('; ');
    const cookie = cookies.find(c => c.startsWith(name + '='));
    return cookie ? decodeURIComponent(cookie.split('=')[1]) : null;
  }

}
