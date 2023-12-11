import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SetforgotpasswordPageRoutingModule } from './setforgotpassword-routing.module';

import { SetforgotpasswordPage } from './setforgotpassword.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SetforgotpasswordPageRoutingModule
  ],
  declarations: [SetforgotpasswordPage]
})
export class SetforgotpasswordPageModule {}
