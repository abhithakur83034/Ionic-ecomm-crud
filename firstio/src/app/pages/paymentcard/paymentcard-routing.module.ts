import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentcardPage } from './paymentcard.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentcardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentcardPageRoutingModule {}
