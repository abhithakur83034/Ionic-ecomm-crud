import { Component, OnInit, Input } from "@angular/core";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "src/app/srvices/auth.service";
import { LoaderService } from "src/app/srvices/loader.service";
import { PaymentService } from "src/app/srvices/payment.service";
import { register } from 'swiper/element/bundle';




@Component({
  selector: 'app-paymentcard',
  templateUrl: './paymentcard.page.html',
  styleUrls: ['./paymentcard.page.scss'],
})
export class PaymentcardPage implements OnInit {

  paymentForm !: FormGroup;
  input:any
  inputs:any
  trimmed:any
convertedCvv:any;
expInp:any
user:any;
userData:any;

  constructor(private payment:PaymentService, private storage:AuthService, private loader:LoaderService) {register(); }

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



    this.paymentForm = new FormGroup({
      card : new FormControl('',[Validators.required]),
      cardNumbar: new FormControl('', [Validators.required]),
      cardHolderName : new FormControl('',[Validators.required]),
      cvv : new FormControl('',[Validators.required]),
      expiry : new FormControl('',[Validators.required]),
    })
    
  }

  get e(){
    return this.paymentForm.controls;
  }

  addSpace(event: KeyboardEvent) {
    this.input = event.target as HTMLInputElement;
    console.log(this.input.value);
    
    this.trimmed = this.input.value.replace(/\s+/g, "");
  console.log(this.trimmed.length);
  
    if (this.trimmed.length >= 4) {
      // Add spaces after every 4 characters
      this.trimmed = this.trimmed.match(/.{1,4}/g).join(" ");
    }
  
    // if (this.trimmed.length >= 4) {
      this.input.value = this.trimmed;
    // }
  }



  
val:any
cvvArray:string[] = []
orgVal: string = '';
  password(event:KeyboardEvent){
    this.val = event.target as HTMLInputElement;
    console.log(this.val.value);
this.cvvArray = this.val.value.slice(-1)
console.log(this.cvvArray);
this.orgVal += this.cvvArray;
    console.log("org",this.orgVal);
    
   let cvv = this.val.value.replace(/\d/g,'*')
    console.log(cvv);
    
    // if (this.cvv.length >= 3) {
    this.val.value = cvv;
    console.log(this.val.value);
    
    // }
  }



  



  newDate:any
  setexpiry(event: KeyboardEvent) {
  this.expInp = event.target as HTMLInputElement;
  this.newDate = this.expInp.value.replace(/\D/g, ''); 

  if (this.newDate.length > 2) {
    // Format the date as MM/YY
    this.newDate = `${this.newDate.slice(0, 2)}/${this.newDate.slice(2, 4)}`;
  }

  this.expInp.value = this.newDate;
}

  
  
  


  paymentData(){
    console.log(this.paymentForm.value);
   this.paymentForm.value.cvv = this.orgVal;
   this.paymentForm.value.userId = this.userData._id

    this.payment.savePayment(this.paymentForm.value).subscribe({
      next: (res:any)=>{
        console.log(res);  
        if(res.status === "success"){
          this.loader.showToast("Card Details Added Sussfully")
        }      
      },error:(error:any)=>{
        console.log(error.error); 
        if(error.error){
          // this.loader.showAlert()
        }       
      },complete:()=>{
        console.log("completed");
        
      }
    })
  }

}
