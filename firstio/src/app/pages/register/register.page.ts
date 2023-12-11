import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/srvices/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm !: FormGroup
  constructor(private userData:AccountService) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      name : new FormControl('',[Validators.required]),  
      mobile : new FormControl('',[Validators.required]),  
      email : new FormControl('',[Validators.required]),  
      password : new FormControl('',[Validators.required]),  
    })
  }

  RegisterData(){
     console.log(this.registerForm.value);
     this.userData.register(this.registerForm.value).subscribe({
      next: (res:any)=>{
        console.log(res); 
        if(res.status === 'success'){
          console.log('registered')
        }else{
          alert(res.message)
        }       
      },
      error:(error:any)=>{
        console.log(error);        
      },complete:()=>{
        console.log('completed');
        
      }
     })
  }

}
