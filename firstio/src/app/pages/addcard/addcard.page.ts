import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AddtocartService } from 'src/app/srvices/addtocart.service';
import { AuthService } from 'src/app/srvices/auth.service';
import { LoaderService } from 'src/app/srvices/loader.service';
import { PaymentService } from 'src/app/srvices/payment.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-addcard',
  templateUrl: './addcard.page.html',
  styleUrls: ['./addcard.page.scss'],
})
export class AddcardPage implements OnInit {
  cardForm!: FormGroup;
  user: any;
  item: any = [];
  userData: any;
  findCard: any = [];
  selectedOption: any;
  filterData: any = [];
  totalPrice: any;
  totalQuantity: any;

  constructor(
    private router: Router,
    private storage: AuthService,
    private Payment: PaymentService,
    private loader: LoaderService,
    private cart: AddtocartService
  ) {
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
  }

  ngOnInit() {
    this.cardForm = new FormGroup({
      cardName: new FormControl('', [Validators.required]),
    });
    console.log('clicked');
    this.showCard();
  }

  get e() {
    return this.cardForm.controls;
  }

  ionViewWillEnter() {
    console.log('......................................................');

    this.showCartData();
  }

  showCard() {
    this.Payment.showCards().subscribe({
      next: (res: any) => {
        console.log(res);
        if (res.status === 'success') {
          this.findCard = res.message.filter(
            (item: any) => item.userId === this.userData._id
          );
          console.log(this.findCard);
        }
      },
      error: (error: any) => {
        console.log(error.error);
      },
      complete: () => {
        console.log('Completed');
      },
    });
  }

  payment() {
    this.router.navigate(['/paymentcard', this.userData._id]);
  }

  cardData() {
    // console.log(this.cardForm.value);
    this.cardForm.value.userId = this.userData._id;
    console.log(this.cardForm.value, this.userData._id);
    this.Payment.checkcard(this.cardForm.value).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res.status === 'success') {
          this.showCartData();

          this.loader.showAlert(
            'paymnt',
            'make your payment',
            () => {
              this.handlePay();
            },
            ['PAY']
          );
        }
      },
      error: (error: any) => {
        console.log(error.error);
      },
      complete: () => {
        console.log('completed');
      },
    });
  }

  handlePay() {
    console.log('User clicked PAY. Performing payment logic...');

    this.Payment.makepay(this.userData._id).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res.status === 'success') {
          this.loader.showToast('payment successfull....');
          this.router.navigate(['']);
          this.addSlip();
        }
      },
      error: (error: any) => {
        console.log(error.error);
        // Handle the error
      },
      complete: () => {
        console.log('completed');
        // Any logic you want to execute when the observable completes
      },
    });
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

  addSlip() {
    let date = new Date().toLocaleString('en-GB', {
      hour12: false,
    });;
    console.log(date);

    this.item = this.filterData.map((item: any) => {
      console.log(
        `Name: ${item.name}, Price: ${item.price}, quantity: ${item.quantity}`
      );
      return {
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      };
    });

    console.log(this.item);

    let data = {
      date: date,
      userName: this.userData.name,
      items: this.item,
      totalQuantity: this.totalQuantity,
      totalPrice: this.totalPrice,
    };
    console.log(data);

    this.Payment.successPay(data).subscribe({
      next: (res: any) => {
        console.log(res);

        // Check if the response has the expected structure
        if (res.status === 'success' && res.message.length > 0) {
          // Extract relevant data from the response
          const slipData = res.message[0];
          console.log(slipData);

          // Create a definition for the PDF content
          const docDefinition = {
            content: [
              { text: 'Slip Details', style: 'header' },
              { text: `Customer Name: ${slipData.userName}` },
              { text: `Date & Time: ${slipData.date}` },
              { text: 'Item Details', style: 'subheader' },
            ],
            styles: {
              header: {
                fontSize: 18,
                bold: true,
              },
              subheader: {
                fontSize: 14,
                bold: true,
              },
              text: {
                fontSize: 20,
                bold: true,
              },
            },
          };

          // Add details for each item to the content array
          slipData.items.forEach((pro: any) => {
            docDefinition.content.push(
              {
                text: `Name: ${pro.name}  | Price: ${pro.price}  |  Quantity: ${pro.quantity}`,
              },
              { text: `` }
            );
          });

          // Add total details to the content array
          docDefinition.content.push(
            { text: 'Total', style: 'subheader' },
            { text: `Total Quantity: ${slipData.totalQuantity}` },
            { text: `Total Price: ${slipData.totalPrice}` }
          );

          // Log the docDefinition to the console
          console.log(docDefinition);

          const pdfDoc = pdfMake.createPdf(docDefinition);

          pdfDoc.download();

          setTimeout(() => {
            this.router.navigate(['']);
          }, 2000);
        } else {
          console.log('Invalid response format');
        }
      },
      error: (error: any) => {
        console.log(error.error);
      },
      complete: () => {
        console.log('completed');
      },
    });
  }
}
