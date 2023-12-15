import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'addproduct',
    loadChildren: () => import('./pages/addproduct/addproduct.module').then( m => m.AddproductPageModule)
  },
  {
    path: 'editprofile',
    loadChildren: () => import('./pages/editprofile/editprofile.module').then( m => m.EditprofilePageModule)
  },
  {
    path: 'editproduct/:id',
    loadChildren: () => import('./pages/editproduct/editproduct.module').then( m => m.EditproductPageModule)
  },
  {
    path: 'emailforgotpassword',
    loadChildren: () => import('./pages/emailforgotpassword/emailforgotpassword.module').then( m => m.EmailforgotpasswordPageModule)
  },
  {
    path: 'resetpassword',
    loadChildren: () => import('./pages/resetpassword/resetpassword.module').then( m => m.ResetpasswordPageModule)
  },
  {
    path: 'enterotp',
    loadChildren: () => import('./pages/enterotp/enterotp.module').then( m => m.EnterotpPageModule)
  },
  {
    path: 'setforgotpassword/:id',
    loadChildren: () => import('./pages/setforgotpassword/setforgotpassword.module').then( m => m.SetforgotpasswordPageModule)
  },
  {
    path: 'changepassword/:id',
    loadChildren: () => import('./pages/changepassword/changepassword.module').then( m => m.ChangepasswordPageModule)
  },
  {
    path: 'paymentcard/:id',
    loadChildren: () => import('./pages/paymentcard/paymentcard.module').then( m => m.PaymentcardPageModule)
  },
  {
    path: 'addtocart',
    loadChildren: () => import('./pages/addtocart/addtocart.module').then( m => m.AddtocartPageModule)
  },
  {
    path: 'addcard/:id',
    loadChildren: () => import('./pages/addcard/addcard.module').then( m => m.AddcardPageModule)
  },
  {
    path: 'reviews',
    loadChildren: () => import('./pages/reviews/reviews.module').then( m => m.ReviewsPageModule)
  },
  {
    path: 'productdetails/:id',
    loadChildren: () => import('./pages/productdetails/productdetails.module').then( m => m.ProductdetailsPageModule)
  },
  {
    path: 'currency/:id',
    loadChildren: () => import('./pages/currency/currency.module').then( m => m.CurrencyPageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
