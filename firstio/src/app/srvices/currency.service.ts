import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http:HttpClient) { }


  getCurrency(){
    return this.http.get(`http://localhost:9000/api/currency`)
  }
}
