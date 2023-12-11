import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddtocartService {

  constructor(private http:HttpClient) { }

  // add product to cart ********************************************************************************************************
  addToCart(data:any){
    console.log(data);
    
    return this.http.post('http://localhost:9000/api/addtocart',data)
  }

  //get Product from cart*******************************************************************************************************

getProcut(){
  return this.http.get(`http://localhost:9000/api/allproduct`)
}


//Product increment******************************************************************************************************************

increment(data:any){
  return this.http.post(`http://localhost:9000/api/increment`,data)
}

//Product decrement******************************************************************************************************************

decrement(data:any){
  return this.http.post(`http://localhost:9000/api/decrement`,data)

}


//Product deletePro******************************************************************************************************************

deletePro(data:any){
  console.log(data);
  
  return this.http.delete(`http://localhost:9000/api/deleteproduct/${data.userId}`,data)
}




//Product deletePro******************************************************************************************************************

clearPro(data:any,id:any){
  return this.http.delete(`http://localhost:9000/api/clearall/${id}`,data)
}



}
