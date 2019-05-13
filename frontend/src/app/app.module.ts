import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { SettingsComponent } from './components/settings/settings.component';
import { UserlistComponent } from './components/userlist/userlist.component';
import { GrupCreateComponent } from './components/grup-create/grup-create.component';
import { LocationPickComponent } from './components/location-pick/location-pick.component';
import { RegistrationLocationComponent } from './components/registration-location/registration-location.component';
import { Chat1to1Component} from './components/chat1to1/chat1to1.component';
import { DataService } from './services/data.services';
import { UserInfoComponent } from './components/user-info/user-info.component';
import {FilterFormComponent} from "./components/filter-form/filter-form.component";
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    SettingsComponent,
    UserlistComponent,
    GrupCreateComponent,
    LocationPickComponent,
    Chat1to1Component,
    RegistrationLocationComponent,
    Chat1to1Component,
    UserInfoComponent,
    FilterFormComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    NativeGeocoder,
    DataService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
