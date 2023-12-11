import { Component, OnInit } from '@angular/core';
import { ProductService } from '../srvices/product.service';
import { LoaderService } from '../srvices/loader.service';
import { EventService } from '../srvices/event.service';
import { Router } from '@angular/router';
import { AddtocartService } from '../srvices/addtocart.service';
import { AuthService } from '../srvices/auth.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  Loading: boolean = false;
  products: any;
  user:any
  userData:any

  constructor(
    private router:Router,
    private productData: ProductService,
    private loader: LoaderService,
    private event:EventService,
    private Cart:AddtocartService,
    private storage:AuthService
  ) {
    console.log("constructor");
    
  }

  ngOnInit(): void {
    console.log("Enter tab ng");
    
    this.getProductFromCart()

    
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



    this.event.refreshPage.subscribe((value:any)=>{
      if(value && value.pageRefrence){
        this.getProduct();
        this.getProductFromCart()
      }
    })
  }


  ionViewWillEnter(){
    console.log("Enter in tab 2");
    
    this.getProduct();

  }



 


  

  async getProduct() {
    await this.loader.showLoading();
    this.Loading = true;
    this.productData.getPRoduct().subscribe({
      next: (res: any) => {
        if (res.status === 'success') {
          console.log(res);
          this.products = res.message;
          this.loader.dismissLoading();
          this.Loading = false;
        }
      },
      error: (error: any) => {
        console.log(error);
        this.loader.dismissLoading();
          this.Loading = false;
      },
      complete: () => {
        console.log('completed');
      },
    });
  }



editProduct(id:any){
this.router.navigate(['/editproduct',id])
}



  deleteProduct(id:any){
   console.log(id);
   this.productData.deleteProduct(id).subscribe((res:any)=>{
    console.log(res);
    if(res.status === 'deleted'){
      this.getProduct()
    }
    
   })
  }


  addToCart(product:any){

    console.log(product);
    product.userId = this.userData._id;
    product.itemId = product._id;
    this.Cart.addToCart(product).subscribe({
      next: (res:any)=>{
        console.log(res);      
        if(res.status === "success"){
          this.getProductFromCart()
          this.loader.showToast(res.message)
        }  else{
          this.loader.showToast(res.message)
        }
      },error:(error:any)=>{
        console.log(error);        
      },complete:()=>{
        console.log("complete");
        
      }
    })
  }



  filterCart:any;
  cartbtn:boolean=false;
  getProductFromCart(){
this.Cart.getProcut().subscribe((res:any)=>{
  console.log(res);
  if(res.status === "success"){
this.filterCart = res.get.filter((item:any)=>item.userId === this.userData._id)
console.log(this.filterCart.length);
if(this.filterCart.length >= 1){
  this.cartbtn = true
}else{
  this.cartbtn = false
}
  }
})
  }



}
