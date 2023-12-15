import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }


  //  Add product*******************************************************************************************************************
addPRoduct(data:any){
  return this.http.post('http://localhost:9000/api/addproduct',data)
}


  //  get product*******************************************************************************************************************
getPRoduct(){
  return this.http.get('http://localhost:9000/api/getproduct')
}






// edit pro******************************************************************************************************

getEditProduct(id:any){
  return this.http.get(`http://localhost:9000/api/getupdate/${id}`)
}


// set edit product***************************************************************************************************

setEditProduct(data:any,id:any){
  return this.http.put(`http://localhost:9000/api/putupdate/${id}`,data)
}


//delete Product****************************************************************************************************************

deleteProduct(id:any){
  return this.http.delete(`http://localhost:9000/api/delete/${id}`)
}

//like product**********************************************************************************************************************
likeProduct(data:any){
  return this.http.post(`http://localhost:9000/api/likeproduct`,data)
}


//dislike product*****************************************************************************************************************

LikesReviews(){
  return this.http.get(`http://localhost:9000/api/getreviewlike`)
}
}
