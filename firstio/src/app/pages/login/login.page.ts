import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/srvices/account.service';
import { AuthService } from "src/app/srvices/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm !: FormGroup
  rememberMe:boolean = false;
  rememberme:any


  constructor(private userData:AccountService, private router:Router, private storage:AuthService) { 
   
  }

  ngOnInit() {
   
    this.loginForm = new FormGroup({
      email : new FormControl('',[Validators.required]),  
      password : new FormControl('',[Validators.required]),  
    })
  }


  // rememberMe: boolean = false;


ionViewWillEnter(){
  console.log("hit");
  
  this.remember();
}

  remember(){
    console.log("Remember Me:", this.rememberMe);
    if( this.rememberMe === true){
      this.storage.getFromStorage('rememberUser').then((res:any)=>{
        console.log(res); 
        if(res){
          this.rememberme = JSON.parse(res)
        }
        console.log(this.rememberme);
        if(this.rememberme){
          this.loginForm.patchValue(this.rememberme)
        }
         
      }).catch((error:any)=>{
        console.log(error);
        
      })
    }else{
        this.storage.removeKey('rememberUser')      
    }


  }



  loginData(){
     console.log(this.loginForm.value);
     this.userData.login(this.loginForm.value).subscribe({
      next: (res:any)=>{
        console.log(res.user); 
        if(res.status === 'success'){
          alert('user Login')
          this.storage.saveToStorage('user',res.user)
          if(this.rememberMe === true){
            this.storage.saveToStorage('rememberUser',this.loginForm.value)

          }
          setTimeout(() => {
            this.router.navigate([''])
          }, 1000);
          this.loginForm.reset();
        }  
      },
      error:(error:any)=>{
        console.log(error.error);        
      },complete:()=>{
        console.log('completed');
        
      }
     })
  }



}
