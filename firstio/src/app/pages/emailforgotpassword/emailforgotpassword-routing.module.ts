import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmailforgotpasswordPage } from './emailforgotpassword.page';

const routes: Routes = [
  {
    path: '',
    component: EmailforgotpasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmailforgotpasswordPageRoutingModule {}
