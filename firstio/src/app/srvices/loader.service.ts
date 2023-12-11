import { Injectable } from '@angular/core';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  loading: any;

  constructor(
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Loading',
    });

    await this.loading.present();
  }

  async dismissLoading() {
    if (this.loading) {
      await this.loadingCtrl.dismiss();
    }
  }

  // async showAlert(header: string, message: string, buttons: any[] = ['OK']) {
  //   const alert = await this.alertCtrl.create({
  //     header: header,
  //     message: message,
  //     buttons: buttons,
  //   });

  //   await alert.present();
  // }

  async showAlert(header: string, message: string, okCallback: () => void, buttons: any[] = ['OK']) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            // Handle the cancel button if needed
          }
        },
        {
          text: 'OK',
          handler: () => {
            // Call the provided callback function when the "OK" button is clicked
            if (okCallback) {
              okCallback();
            }
          }
        }
      ]
    });
  
    await alert.present();
  }
  

  async showToast(message: string, duration: number = 2000, position: any = 'top') {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position,
    });

    await toast.present();
  }
}
