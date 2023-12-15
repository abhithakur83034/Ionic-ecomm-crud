import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http:HttpClient) { }

  addReviews(data:any){
    return this.http.post(`http://localhost:9000/api/addproreview`,data)
  }


  getreviews(){
    return this.http.get(`http://localhost:9000/api/showproreview`)
  }


  editReview(data:any){
    return this.http.put(`http://localhost:9000/api/editproReview`,data)
 
  }



}
