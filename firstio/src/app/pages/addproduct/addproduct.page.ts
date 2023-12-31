import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { EventService } from 'src/app/srvices/event.service';
import { ProductService } from 'src/app/srvices/product.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.page.html',
  styleUrls: ['./addproduct.page.scss'],
})
export class AddproductPage implements OnInit {
  productForm!: FormGroup;
  file: any;
  user: any;
  constructor(
    private navController: NavController,
    private Product: ProductService,
    private event: EventService,
    private camera: Camera
  ) {}

  ngOnInit() {
    this.productForm = new FormGroup({
      image: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      quality: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      quantity: new FormControl('1', [Validators.required]),
    });
  }
  navigateBack() {
    // this.navController.back();
    this.event.refreshPage.next({ pageRefrence: 'addProduct' });
  }

  get e() {
    return this.productForm.controls;
  }

  fileChange(event: any) {
    this.file = event.target.files[0];
    console.log(this.file);
  }

  productData() {
    console.log(this.productForm.value);
    let formData = new FormData();
    formData.append('image', this.file);
    formData.append('name', this.productForm.value.name);
    formData.append('price', this.productForm.value.price);
    formData.append('quality', this.productForm.value.quality);
    formData.append('description', this.productForm.value.description);
    formData.append('quantity', this.productForm.value.quantity);
    this.Product.addPRoduct(formData).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        console.log('completed');
      },
    });
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };

    this.camera.getPicture(options).then(
      (imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64:
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        console.log(base64Image);
      },
      (err) => {
        // Handle error
        console.log('Error: ', err);
      }
    );
  }
}
