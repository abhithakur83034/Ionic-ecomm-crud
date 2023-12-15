import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BaseRouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import {NativeStorage} from '@ionic-native/native-storage/ngx'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Camera } from '@ionic-native/camera/ngx';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{ provide: BaseRouteReuseStrategy, useClass: IonicRouteStrategy },NativeStorage,Camera],
  bootstrap: [AppComponent],
})
export class AppModule {}
