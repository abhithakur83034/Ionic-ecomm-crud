import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SetforgotpasswordPage } from './setforgotpassword.page';

describe('SetforgotpasswordPage', () => {
  let component: SetforgotpasswordPage;
  let fixture: ComponentFixture<SetforgotpasswordPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SetforgotpasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
