import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmailforgotpasswordPageRoutingModule } from './emailforgotpassword-routing.module';

import { EmailforgotpasswordPage } from './emailforgotpassword.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EmailforgotpasswordPageRoutingModule
  ],
  declarations: [EmailforgotpasswordPage]
})
export class EmailforgotpasswordPageModule {}
