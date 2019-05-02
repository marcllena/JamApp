import { Component, ViewChild, ElementRef } from '@angular/core';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import {ToolbarService} from "../../../../services/toolbar.service";
import { Platform } from '@ionic/angular';
import { UserServices } from "../../../../services/user.services";

declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  marker:any
  latitud: number;
  longitud: number;

  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private toolbarService: ToolbarService,
    public platform: Platform,
    private userService: UserServices
  ) {
  }

  ngOnInit() {
  this.obtindreUbicacio();
  }

  refresh(){
    this.obtindreUbicacio();
  }

  obtindreUbicacio(){
    //Si es un mobil
    if(this.platform.is('cordova')){
      this.geolocation.getCurrentPosition().then((resp) => {
        this.latitud = resp.coords.latitude;
        this.longitud = resp.coords.longitude;
        this.loadMap();
        return;
      }).catch((error) => {
        console.log('Error getting location', error);
      });
    }
    else if(this.platform.is('desktop')){
      //Si es desktop
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((resp) => {
          this.latitud = resp.coords.latitude;
          this.longitud = resp.coords.longitude;
          console.log("Probaaa"+this.latitud)
          this.loadMap();
          return
        });
      }
      else {
        console.log("Geolocation is not supported by this browser.");
      }
    }
    //Si no tirem de  geolocalització per IP
    this.userService.getUserLocation()
      .subscribe(response => {
        console.log("Resposta de la API "+ response)
        if(response.status == 200){
          this.latitud = response.body['lat'];
          this.longitud = response.body['lon']
          this.loadMap();
          return
        }
      },err=>{
        if(err.status == 500){
          console.log("Error");
          //Estem fotuts, inventem ubicació
          this.latitud=41.2800161;
          this.longitud=1.9766294;

        }
      })

  }

  loadMap() {
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: this.latitud , lng: this.longitud},
        zoom: 12,
        styles: [
          {
            "featureType": "poi",
            "stylers": [
              { "visibility": "off" }
            ]
          }
        ]
      });
    this.marker = new google.maps.Marker({position: {lat: 41.2800161 , lng: 1.9766294}, map: this.map});
  }




}
