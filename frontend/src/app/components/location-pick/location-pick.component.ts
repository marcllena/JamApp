import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Geolocation} from "@ionic-native/geolocation/ngx";
import {NativeGeocoder} from "@ionic-native/native-geocoder/ngx";
import {ToolbarService} from "../../services/toolbar.service";
import {Platform, ToastController} from "@ionic/angular";
import {UserServices} from "../../services/user.services";

declare var google;

@Component({
  selector: 'app-location-pick',
  templateUrl: './location-pick.component.html',
  styleUrls: ['./location-pick.component.scss'],
})
export class LocationPickComponent implements OnInit {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  marker:any
  latitud: number;
  longitud: number;
  clickedLatitud: number;
  clickedLongitud: number;



  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private toolbarService: ToolbarService,
    public platform: Platform,
    public toastController: ToastController,
    private userService: UserServices,
  ) {
    this.clickedLatitud= -360;
    this.clickedLongitud= -360;
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
    google.maps.event.addListener(this.map,"click", (event) => {
      this.clickedLongitud=event.latLng.lng();
      this.clickedLatitud=event.latLng.lat();
      if(this.marker==null) {
        this.placeNewMarker();
      }
      else{
        this.updateMarkerPosition();
      }
      this.setLocation();

    });
  }
  placeNewMarker(){
    var image = {
      url: '../../../assets/markers/music-marker.png',
    }
      this.marker = new google.maps.Marker({
      position: {lat: this.clickedLatitud , lng: this.clickedLongitud},
      //icon: image, //De moment deixem la imatge per defecte
      map: this.map,
    });
  }
  updateMarkerPosition(){
    this.marker.setPosition(new google.maps.LatLng( this.clickedLatitud, this.clickedLongitud ));
  }
  getLocation(){
    /*console.log("Latitud: "+this.clickedLatitud+", Longitud: "+this.clickedLongitud);
    //Creem nou objecte amb les ubicacions:
    var coordinates = {
      latitud: this.clickedLatitud,
      longitud: this.clickedLongitud
    };
    let token =localStorage.getItem('token');
    this.userService.setLocation(token,coordinates)
      .subscribe(async response => {
          console.log("Resposta del BackEnd" + response.body);
          if (response.status == 200) {
            const toast = await this.toastController.create({
              message: "Posicion Fijada Correctamente",
              duration: 2000,
              position: 'bottom',
            });
            toast.present();
          } else {
            //Error desconegut
            console.log("Error");
          }
        },
        err => {
          console.log("Error del BackEnd"+err);
          //console.log(err);
        });*/
  }

  setLocation(){
    console.log("Operació fixar posició realitzada al BackEnd:");
    console.log("Latitud: "+this.clickedLatitud+", Longitud: "+this.clickedLongitud);
    //Creem nou objecte amb les ubicacions:
    var coordinates = {
      latitud: this.clickedLatitud,
      longitud: this.clickedLongitud
    };
    let token =localStorage.getItem('token');
    this.userService.setLocation(token,coordinates)
      .subscribe(async response => {
          console.log("Resposta del BackEnd" + response.body);
          if (response.status == 200) {
            const toast = await this.toastController.create({
              message: "Posicion Fijada Correctamente",
              duration: 2000,
              position: 'bottom',
            });
            toast.present();
          } else {
            //Error desconegut
            console.log("Error");
          }
        },
        err => {
          console.log("Error del BackEnd"+err);
          //console.log(err);
        });
  }

}
