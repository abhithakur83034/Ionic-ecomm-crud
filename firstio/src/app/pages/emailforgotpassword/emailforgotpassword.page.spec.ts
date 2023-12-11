import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmailforgotpasswordPage } from './emailforgotpassword.page';

describe('EmailforgotpasswordPage', () => {
  let component: EmailforgotpasswordPage;
  let fixture: ComponentFixture<EmailforgotpasswordPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EmailforgotpasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
