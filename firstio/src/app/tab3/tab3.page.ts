import { Component } from '@angular/core';
import { AuthService } from '../srvices/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {

  user:any;
  userData:any;


  constructor(private router:Router,private storage: AuthService) {
    this.user = this.storage
      .getFromStorage('user')
      .then((res: any) => {
        console.log(res);
        this.userData = JSON.parse(res);
        console.log(this.userData);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  logOutUser() {
    // console.log('clicked');
    this.storage.removeKey("user");
this.router.navigate(['/login'])
  }


  changePassword(){
    // console.log("change password");
    this.router.navigate(["/changepassword", this.userData._id])
    
  }

 


}
