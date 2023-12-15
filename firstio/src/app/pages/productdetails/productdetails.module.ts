import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductdetailsPageRoutingModule } from './productdetails-routing.module';

import { ProductdetailsPage } from './productdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,
    IonicModule,
    ProductdetailsPageRoutingModule
  ],
  declarations: [ProductdetailsPage]
})
export class ProductdetailsPageModule {}
