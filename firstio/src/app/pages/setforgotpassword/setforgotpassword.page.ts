import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/srvices/account.service';

@Component({
  selector: 'app-setforgotpassword',
  templateUrl: './setforgotpassword.page.html',
  styleUrls: ['./setforgotpassword.page.scss'],
})
export class SetforgotpasswordPage implements OnInit {
  setPassword  !: FormGroup
user:any;

  constructor(private route:ActivatedRoute, private router:Router,private account:AccountService) { 
 this.user =  this.route.snapshot.paramMap.get('id')
  }

  ngOnInit() {
    this.setPassword = new FormGroup({
      password : new FormControl("",[Validators.required])
    })
  }


  passwordData(){
   console.log( this.setPassword.value);
   this.account.setNewPassword(this.setPassword.value,this.user).subscribe({
    next: (res:any)=>{
      console.log(res); 
      if(res.status === 'success'){
        this.router.navigate(['/login'])
      }     
    },error:(error:any)=>{
      console.log(error.error);      
    },complete:()=>{
      console.log("Complete");
      
    }
   })
  }

}
