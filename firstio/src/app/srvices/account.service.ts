import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http:HttpClient) { }

// user register*******************************************************************************************

  register(data:any){
    return this.http.post('http://localhost:9000/api/register',data)
  }

// user Login*********************************************************************************************

login(data:any){
  return this.http.post('http://localhost:9000/api/login',data)
}

//registeredUser *********************************************************************************************

getUser(){
  return this.http.get('http://localhost:9000/api/registereduser')
}


//
forgotPasswordMail(data:any){
  console.log(data);
  
  return this.http.post(`http://localhost:9000/api/forgetpasswordmail`,data)
}


// otp verify******************************************************************************************************

verifyOtp(data:any){
  return this.http.post(`http://localhost:9000/api/otpverify`,data)
}



// set New Password************************************************************************************

setNewPassword(data:any,id:any){
  console.log(data);
  
  return this.http.put(`http://localhost:9000/api/setPassword/${id}`,data)
}

// change password*************************************************************************

changePassword(data:any,id:any){
  console.log(data);
  
  return this.http.put(`http://localhost:9000/api/changePassword/${id}`,data)
}


}
