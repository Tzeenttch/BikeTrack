import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  imports: [ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  searchForm: FormGroup;
  showError: boolean = false;

  @Output() searchResults = new EventEmitter<any[]>();


  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.searchForm = this.fb.group({
      brand: [''],
      model: [''],
      year: ['']
    });
  }

  onSearch() {
    const { brand, model, year } = this.searchForm.value;
  console.log('Valores enviados al backend:', { brand, model, year }); 

    this.http.post<any[]>('http://172.22.227.158:8080/motorbike/search', { brand, model, year }).subscribe({
      next: (data) => {
        this.searchResults.emit(data);
      },
      error: (error) => {
        console.log("Error al buscar motos", error)
        setTimeout(() => {
          this.showError = true;
        }, 3000);
      }
    });
  }

  resetForm(){
    this.searchForm.reset();
    window.location.reload();
  }

}

