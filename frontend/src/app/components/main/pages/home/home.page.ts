import { Component, ViewChild, ElementRef } from '@angular/core';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

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

  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder) {
  }

  ngOnInit() {
    this.loadMap();
  }

  loadMap() {
      //Queda pendent obtindre la ubicació del usuari, dependent si es browser o app
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 41.2800161 , lng: 1.9766294},
        zoom: 12
      });
    this.marker = new google.maps.Marker({position: {lat: 41.2800161 , lng: 1.9766294}, map: this.map});
  }


}
