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
import { GrupCreateComponent } from './components/grup-create/grup-create.component';
import { LocationPickComponent } from './components/location-pick/location-pick.component';
import { RegistrationLocationComponent } from './components/registration-location/registration-location.component';
import { Chat1to1Component} from './components/chat1to1/chat1to1.component';
import { DataService } from './services/data.services';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { ChatListComponent } from './components/main/pages/chat-list/chat-list.component';
import {FilterFormComponent} from "./components/filter-form/filter-form.component";
import {PoliticaComponent} from "./components/politica/politica.component";
import {GrupLocationComponent} from "./components/grup-location/grup-location.component";
import { JamCreateComponent } from "./components/jam-create/jam-create.component";

import {CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular';
import { Cloudinary } from 'cloudinary-core';
import { SalaInfoComponent } from './components/sala-info/sala-info.component';
import { GroupInfoComponent } from './components/group-info/group-info.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    SettingsComponent,
    GrupCreateComponent,
    LocationPickComponent,
    Chat1to1Component,
    RegistrationLocationComponent,
    Chat1to1Component,
    UserInfoComponent,
    ChatListComponent,
    FilterFormComponent,
    PoliticaComponent,
    GrupLocationComponent,
    JamCreateComponent,
    SalaInfoComponent,
    GroupInfoComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    //CloudinaryModule.forRoot({Cloudinary}, {cloud_name: 'jamapp'} as CloudinaryConfiguration),
    //CloudinaryModule
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
