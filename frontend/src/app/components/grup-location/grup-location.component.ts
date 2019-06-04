import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Geolocation} from "@ionic-native/geolocation/ngx";
import {NativeGeocoder} from "@ionic-native/native-geocoder/ngx";
import {ToolbarService} from "../../services/toolbar.service";
import {Platform, ToastController} from "@ionic/angular";
import {UserServices} from "../../services/user.services";
import {Router} from "@angular/router";
import {Group} from "../../models/group";
import {DataService} from "../../services/data.services";

declare var google;

@Component({
  selector: 'app-grup-location',
  templateUrl: './grup-location.component.html',
  styleUrls: ['./grup-location.component.scss'],
})

export class GrupLocationComponent implements OnInit {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  marker:any;
  latitud: number;
  longitud: number;
  clickedLatitud: number;
  clickedLongitud: number;
  exito:boolean;
  markerPosition:any;
  groupName: string;
  groupMail: string;
  groupDescription: string;
  groupEstils: any


  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private toolbarService: ToolbarService,
    public platform: Platform,
    public toastController: ToastController,
    private userService: UserServices,
    private router: Router,
    private singleton: DataService,
  ) {
    this.clickedLatitud= -360;
    this.clickedLongitud= -360;
  }

  async ngOnInit() {
    this.singleton.newGroupName.subscribe(result => this.groupName = result);
    this.singleton.newGroupMail.subscribe(result => this.groupMail = result);
    this.singleton.newGroupDescription.subscribe(result => this.groupDescription = result);
    this.singleton.newGroupEstils.subscribe(result => this.groupEstils= result);
    this.obtindreUbicacio();
    this.mostrarToast();
  }
  async mostrarToast() {
    const toast = await this.toastController.create({
      message: "Porfavor seleccione la ubicación del grupo en el mapa",
      duration: 3000,
      position: 'bottom',
    });
    toast.present();
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
    var icon = {
      url: '../../../assets/markers/bluecircle.png',
    };
    this.markerPosition = new google.maps.Marker({
      position: {lat: this.latitud, lng: this.longitud},
      map: this.map,
      icon: icon,
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
      this.guardar();

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


  guardar() {
    console.log("Operacio de crear un grup realitzada al backend: ");
    let group = new Group(this.groupName, this.groupMail, this.groupDescription, this.clickedLatitud,this.clickedLongitud,this.groupEstils,);
    let token =localStorage.getItem('token');
    this.userService.createGroup(token,group)
      .subscribe(async response => {
          console.log("Resposta del backend" + response);
          if (response.status == 200) {
            //Operacio realitzada correctament
            //Mostrem toast
            const toast = await this.toastController.create({
              message: "Grupo Correctamente Creado",
              duration: 3000,
              position: 'bottom',
            });
            toast.present();
            this.router.navigateByUrl("/api/menu/home");
          } else {
            //Error desconegut
            console.log("Error");
          }
        },
        err=>{
          console.log("Error al backend"+err);
          if(err.status == 409){
            console.log("Error 409");
          }
          else if(err.status == 500){
            console.log("Error 500");
          }
        });
  }

}
