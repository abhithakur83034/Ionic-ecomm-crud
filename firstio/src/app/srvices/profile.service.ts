import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient) { }


  registeredUser(){
    return this.http.get(`http://localhost:9000/api/registereduser`)
  }


  editProfile(data:any,id:any){
    return this.http.put(`http://localhost:9000/api/userupdate/${id}`,data)
  }

}
