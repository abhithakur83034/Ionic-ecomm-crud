import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddcardPage } from './addcard.page';

describe('AddcardPage', () => {
  let component: AddcardPage;
  let fixture: ComponentFixture<AddcardPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddcardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
