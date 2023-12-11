import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/srvices/auth.service';
import { EventService } from 'src/app/srvices/event.service';
import { ProfileService } from 'src/app/srvices/profile.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {
  file: any;
  editProfile!: FormGroup;
  user: any;
  userData: any;
  activeUser: any;
  userActive: any;

  constructor(
    private refreshService: EventService,
    private profile: ProfileService,
    private storage: AuthService
  ) {}
  navigateBack() {
    // this.navController.back();
    this.refreshService.refreshPage.next({"editProfile":"true"});
  }
  ngOnInit() {
    this.RegisteredUser();

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

    this.editProfile = new FormGroup({
      image: new FormControl(''),
      name: new FormControl(''),
      email: new FormControl(''),
      mobile: new FormControl(''),
    });
  }

  RegisteredUser() {
    this.profile.registeredUser().subscribe((res: any) => {
      // console.log(res);
      if (res.status === 'success') {
        this.activeUser = res.reg.filter(
          (item: any) => item._id === this.userData._id
        );
        // console.log(this.activeUser);
        this.userActive = this.activeUser[0]
        // console.log(this.userActive);
        this.editProfile.patchValue(this.userActive)
      }
    });
  }

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  editUserProfile() {
    console.log(this.editProfile.value);
    let formData = new FormData();
    formData.append('image', this.file),
      formData.append('name', this.editProfile.value.name),
      formData.append('mobile', this.editProfile.value.mobile),
      formData.append('email', this.editProfile.value.email);

    this.profile.editProfile(formData,this.userData._id).subscribe({
      next: (res: any) => {
        console.log(res);
        if(res.status === "updated")
        {
          this.RegisteredUser()
        }
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }
}
