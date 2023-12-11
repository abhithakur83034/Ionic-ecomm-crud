import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http:HttpClient) { }

//save payment**********************************************************************************************************
savePayment(data:any){
  console.log(data);
  
  return this.http.post(`http://localhost:9000/api/payment`,data)
}

//show card******************************************************************************************************************

showCards(){
  return this.http.get(`http://localhost:9000/api/showcard`)
}

//makePayment*******************************************************************************************************************

makepay(id:any){
  console.log(id);
  
  
  
  return this.http.delete(`http://localhost:9000/api/makepayment/${id}`)
}



//makePayment*******************************************************************************************************************

checkcard(data:any ){
  console.log(data);
  
  return this.http.post(`http://localhost:9000/api/checkuser`,data)
}



//successPay************************************************************************************************************************

successPay(data:any=[]){
  console.log(data);
  
  return this.http.post(`http://localhost:9000/api/successpay`,data)
}




}
