import { Component, OnInit } from '@angular/core';
import { CurrencyService } from 'src/app/srvices/currency.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.page.html',
  styleUrls: ['./currency.page.scss'],
})
export class CurrencyPage implements OnInit {
  currencies: any;
  selectedCurrency: any[] = [];
  inputAmount: any; selectedFromCurrency: any; 
  selectedToCurrency: any;
  toCurrencyOptions: any;



  forInputSymbol:any;
  forOutputSymbol:any;
  

  constructor(private currency: CurrencyService) {}

  ngOnInit() {
    console.log('clicked');
    this.getCurrencies();

    
   
    // this.forOutputSymbol = this.selectedToCurrency;
  }

  getCurrencies() {
    this.currency.getCurrency().subscribe((res: any) => {
      // console.log(res);
      if (res.status === 'success') {
        this.currencies = res.currencyConfig;
        // console.log(this.currencies);
        this.selectedCurrency = Object.values(this.currencies);
      }
    });
  }

  updateFromCurrencyOptions(){
    console.log(this.selectedFromCurrency.symbol);
    this.forInputSymbol = this.selectedFromCurrency.symbol;
    
    this.toCurrencyOptions = this.selectedCurrency.filter(currency => currency !== this.selectedFromCurrency);
  }

  updateToCurrencyOptions(){
    console.log(this.selectedToCurrency);
  }

  inputNumber(event: any) { 
    // console.log(this.inputAmount);
    let numberInput = event.target as HTMLInputElement;
    // console.log(numberInput);
    let number = numberInput.value;   
    const valueWithSymbol = `${this.forInputSymbol} ${number}`;
  console.log(valueWithSymbol);
  }


}
