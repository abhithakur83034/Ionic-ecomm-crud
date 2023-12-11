import { Component, OnInit } from '@angular/core';
import { AccountService } from '../srvices/account.service';
import { LoaderService } from '../srvices/loader.service';
import { AuthService } from '../srvices/auth.service';
import { EventService } from '../srvices/event.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  user: any;
  userData: any;
  registeredUser: any;
  User: any;
  loading: boolean = false;

  constructor(
    private regData: AccountService,
    private loader: LoaderService,
    private storage: AuthService,
    private event: EventService
  ) {}

  ngOnInit(): void {
    console.log('ngonInit');
  }

  ionViewWillEnter() {
    this.getRegUser();

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

    this.event.refreshPage.subscribe((value: any) => {
      if (value && value.editProfile) {
        this.getRegUser();
      }
    });
  }

  async getRegUser() {
    await this.loader.showLoading();
    this.loading = true;
    // console.log(this.loading);

    this.regData.getUser().subscribe({
      next: (res: any) => {
        // console.log(res);
        if (res.status === 'success') {
          this.registeredUser = res.reg.filter(
            (item: any) => item._id === this.userData._id
          );
          this.User = this.registeredUser[0];
          // console.log("from ",this.User);
          this.loader.dismissLoading();
          this.loading = false;
        }
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        this.loader.dismissLoading();
        this.loading = false;
        // console.log("from complete",this.loading );
      },
    });
  }
}
