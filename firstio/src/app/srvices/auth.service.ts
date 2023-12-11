import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform } from '@ionic/angular';

// import { rejects } from 'assert';
// import { error } from 'console';
// import { promises, resolve } from 'dns';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private nativeStorage: NativeStorage,
    private platform: Platform,
    private httpClient: HttpClient
  ) {}

  saveToStorage(key:any,data: any) {
    if (!this.platform.is('cordova')) {
      localStorage.setItem(key, JSON.stringify(data));
    } else {
      this.nativeStorage.setItem(key, JSON.stringify(data));
    }
  }

  getFromStorage(key: any): Promise<any> {
    console.log(key);
    
    if (!this.platform.is('cordova')) {
      return new Promise(async (resolve, reject) => {
        const data =  localStorage.getItem(key);
        console.log(data);
        resolve(data);
        
      });
    } else {
      return this.nativeStorage.getItem(key).then(
        (data) => data,
        (error: any) => {
          return null;
        }
      );
    }
  }

  
  removeKey(key:any) {
    if (!this.platform.is('cordova')) {
      console.log(key);
      
      localStorage.removeItem(key);
    } else {
      this.nativeStorage.remove(key);
    }
  }
}
