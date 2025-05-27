import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-terms-and-conditions',
  imports: [],
  templateUrl: './terms-and-conditions.component.html',
  styleUrl: './terms-and-conditions.component.css'
})
export class TermsAndConditionsComponent {

  ngOnInit(): void{
    window.scrollTo({ top: 0, behavior: 'auto'});
  }

}
