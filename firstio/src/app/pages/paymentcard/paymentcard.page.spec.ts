import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentcardPage } from './paymentcard.page';

describe('PaymentcardPage', () => {
  let component: PaymentcardPage;
  let fixture: ComponentFixture<PaymentcardPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PaymentcardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
