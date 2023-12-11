import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddtocartService } from 'src/app/srvices/addtocart.service';
import { AuthService } from 'src/app/srvices/auth.service';
import { EventService } from 'src/app/srvices/event.service';
import { LoaderService } from 'src/app/srvices/loader.service';

@Component({
  selector: 'app-addtocart',
  templateUrl: './addtocart.page.html',
  styleUrls: ['./addtocart.page.scss'],
})
export class AddtocartPage implements OnInit {

  constructor(private storage:AuthService, private cart:AddtocartService,private loader:LoaderService,private router:Router, private event: EventService) { }
  user:any;
  userData:any;
  filterCart:any
  filterData:any;
  totalPrice:any;
  totalQuantity:any;


  ngOnInit() {

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
    this.showCartData();
  }

  




  navigateBack() {
    // this.navController.back();
    this.event.refreshPage.next({'pageRefrence':"addtocart"});
  }



  showCartData() {
    this.cart.getProcut().subscribe((data: any) => {
      console.log('from db', data.get);
      let allData = data.get;
      this.filterData = allData.filter(
        (item: any) => item.userId === this.userData._id
      );
      console.log('filterdata', this.filterData);
     

      this.totalPrice = 0;
      this.filterData.forEach((item: any) => {
        this.totalPrice += item.price * item.quantity;
      });

      console.log('Total Price:', this.totalPrice);

      this.totalQuantity = 0;
      this.filterData.forEach((item: any) => {
        this.totalQuantity += item.quantity;
      });

      console.log('Total Quantity:', this.totalQuantity);
    });
  }










  increment(data:any){
console.log(data);
this.cart.increment(data).subscribe({
  next: (res:any)=>{
    console.log(res); 
    if(res.status === "success"){
      data.quantity += 1;
      this.totalPrice += res.updatedItem.price;
      this.totalQuantity += res.quantityAdded;
this.loader.showToast(res.message)
    }   
  },error:(error:any)=>{
    console.log(error.error); 
    this.loader.showToast(error.error)   
  },complete:()=>{
    console.log("complete");
    
  }
})

  }


  decrement(data:any){
    console.log(data);
    this.cart.decrement(data).subscribe({
      next: (res:any)=>{
        console.log(res); 
        if (res.status === 'success') {
          this.loader.showToast(res.message)

          this.showCartData();
        } else {
          this.totalPrice -= res.updatedItem.price;
          this.totalQuantity -= res.quantityREMOVED;
        }   
      },error:(error:any)=>{
        console.log(error.error);    
      },complete:()=>{
        console.log("complete");
        
      }
    })
  }


  deletePro(data:any){
    console.log(data);
    this.cart.deletePro(data).subscribe({
      next: (res:any)=>{
        console.log(res); 
        if(res.status === "success"){
          this.loader.showToast("item removed from cart")
          this.showCartData()
        }   
      },error:(error:any)=>{
        console.log(error.error);    
      },complete:()=>{
        console.log("complete");
        
      }
    })
  }




  card(){
    this.router.navigate(['/addcard',this.userData._id])
  }


}
