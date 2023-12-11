import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetforgotpasswordPage } from './setforgotpassword.page';

const routes: Routes = [
  {
    path: '',
    component: SetforgotpasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetforgotpasswordPageRoutingModule {}
