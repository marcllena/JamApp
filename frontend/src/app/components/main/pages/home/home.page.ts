import { Component, OnInit,ViewChild } from '@angular/core';
import {ToolbarService} from "../../../../services/toolbar.service";
import {Platform,NavController} from "@ionic/angular";

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  MarkerOptions,
  Marker
} from "@ionic-native/google-maps";


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild('map') element;

  constructor(private toolbarService: ToolbarService, public googleMaps: GoogleMaps, public plt: Platform,
              public nav: NavController) { }

  ngOnInit() {
    /*this.plt.ready().then(() => {
      this.initMap();
    });*/
  }

  ngAfterViewInit() {

  }

  initMap() {

    let map: GoogleMap = this.googleMaps.create(this.element.nativeElement);

    map.one(GoogleMapsEvent.MAP_READY).then((data: any) => {

      let coordinates: LatLng = new LatLng(33.6396965, -84.4304574);

      let position = {
        target: coordinates,
        zoom: 17
      };

      map.animateCamera(position);

      let markerOptions: MarkerOptions = {
        position: coordinates,
        icon: "assets/images/icons8-Marker-64.png",
        title: 'Our first POI'
      };

      const marker = map.addMarker(markerOptions)
        .then((marker: Marker) => {
          marker.showInfoWindow();
        });
    })
  }

}
