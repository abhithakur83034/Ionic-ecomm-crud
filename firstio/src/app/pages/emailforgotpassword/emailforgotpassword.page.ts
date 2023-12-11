import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/srvices/account.service';

@Component({
  selector: 'app-emailforgotpassword',
  templateUrl: './emailforgotpassword.page.html',
  styleUrls: ['./emailforgotpassword.page.scss'],
})
export class EmailforgotpasswordPage implements OnInit {
  forgotPassword !: FormGroup
  constructor(private userDatas:AccountService, private router:Router) { }

  ngOnInit() {
    this.forgotPassword = new FormGroup({
      email  :new FormControl('', [ Validators.required])
    })
  }

  get e(){
    return this.forgotPassword.controls;
  }


  forgotPasswordMail(){
    console.log(this.forgotPassword.value);
    this.userDatas.forgotPasswordMail(this.forgotPassword.value).subscribe({
      next: (res:any)=>{
        console.log(res);   
        if(res.status === "success"){
          // alert(res.message)
          this.router.navigate(['/enterotp'])
        }     
      },
      error:(error:any)=>{
        console.log(error.error);  
        if(error.error.status === 'warning') {
          alert( error.error.message)
        }     
      },complete:()=>{
        console.log("completed");
        
      }
    })
  }
}
