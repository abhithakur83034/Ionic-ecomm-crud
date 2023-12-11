import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/srvices/event.service';
import { ProductService } from 'src/app/srvices/product.service';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.page.html',
  styleUrls: ['./editproduct.page.scss'],
})
export class EditproductPage implements OnInit {
productId : any ;
editProduct !: FormGroup;
file:any;
singleProduct:any;


  constructor(private route:ActivatedRoute,private productData: ProductService,private router:Router, private event: EventService) { }

  ngOnInit() {

    this.editProduct = new FormGroup({
      image: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      quality: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      quantity: new FormControl('1', [Validators.required]),
    })


    console.log("edit product");
      this.productId = this.route.snapshot.paramMap.get('id')
      this.getEditProduct()
  }


  navigateBack() {
    // this.navController.back();
    this.event.refreshPage.next({'pageRefrence':"editProduct"});
  }




  get e(){
    return this.editProduct.controls;
  }

getEditProduct(){
  this.productData.getEditProduct(this.productId).subscribe((res:any)=>{
    console.log(res);
    if(res.status === 'getUser'){
      this.singleProduct = res.singlePro
this.editProduct.patchValue(this.singleProduct)
    }
  })
}

onFileChange(event: any) {
  this.file = event.target.files[0];
}



editProductData() {
  console.log(this.editProduct.value);
  let formData = new FormData()
  formData.append ('image',this.file)
  formData.append ("name", this.editProduct.value.name)
  formData.append ("price", this.editProduct.value.price)
  formData.append ("quality", this.editProduct.value.quality)
  formData.append ("description", this.editProduct.value.description)
  formData.append ("quantity", this.editProduct.value.quantity)
  this.productData.setEditProduct(formData,this.singleProduct._id).subscribe({
    next: (res: any) => {
      console.log(res);
      if(res.status === "updated"){
this.router.navigate(['tabs/tab2'])
      }
    },
    error: (error: any) => {
      console.log(error);
    },
    complete: () => {
      console.log('completed');
    },
  });
}

}
