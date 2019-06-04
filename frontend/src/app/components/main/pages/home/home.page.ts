import { Component, ViewChild, ElementRef } from '@angular/core';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder,  NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import {ToolbarService} from "../../../../services/toolbar.service";
import { Platform } from '@ionic/angular';
import { UserServices } from "../../../../services/user.services";
import {HttpResponse} from "@angular/common/http";
import {DataService} from '../../../../services/data.services';
import {ActivatedRoute, Router} from "@angular/router";

declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  marker:any;
  latitud: number;
  longitud: number;
  userList:any;
  markersListUsers: any;
  markersListSalas: any;
  markerPosition:any;
  userClicked:any;
  salaClicked:any;
  musicsFilter:boolean;
  salesFilter:boolean;
  distanciaBooleanFilter:boolean;
  distanciaValueFilter:number;

  constructor(
    private singleton: DataService,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private toolbarService: ToolbarService,
    public platform: Platform,
    private userService: UserServices,
    private router: Router,
    private activatedRoute:ActivatedRoute
  ) {
    this.markersListUsers=[];
    this.markersListSalas=[];
    activatedRoute.params.subscribe(val => {
      this.refresh();
    });
  }

  ngOnInit() {
    this.singleton.newMusicsFilter.subscribe(result => this.musicsFilter = result);
    this.singleton.newSalesFilter.subscribe(result => this.salesFilter = result);
    this.singleton.newDistanciaBooleanFilter.subscribe(result => this.distanciaBooleanFilter = result);
    this.singleton.newDistanciaValueFilter.subscribe(result => this.distanciaValueFilter= result);
    this.obtindreUbicacio();
  }

  refresh(){
    this.singleton.newMusicsFilter.subscribe(result => this.musicsFilter = result);
    this.singleton.newSalesFilter.subscribe(result => this.salesFilter = result);
    this.singleton.newDistanciaBooleanFilter.subscribe(result => this.distanciaBooleanFilter = result);
    this.singleton.newDistanciaValueFilter.subscribe(result => this.distanciaValueFilter= result);
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
      var icon = {
        url: '../../../assets/markers/bluecircle.png',
      };
        this.markerPosition = new google.maps.Marker({
        position: {lat: this.latitud, lng: this.longitud},
        map: this.map,
        icon: icon,
      });

      if(this.distanciaBooleanFilter) {
        this.obtindreUsuarisFiltrats();
      }
      else{
        this.obtindreUsuaris();
      }
  }

  obtindreUsuaris(){
    this.userService.getLocations()
      .subscribe(
        async response => {
          if(response.status==200) {
            this.userList=response.body;
            //Mostrem els musics
            if(this.musicsFilter) {
              var image1 = {
                url: '../../../assets/markers/music-marker.png',
                scaledSize: new google.maps.Size(50, 50)
              };
              /*for (let i = 0; i < this.userList.musicians.length; i++) {
                if(this.userList.musicians[i].location=!null) {
                  this.markersListUsers[i]=new google.maps.Marker({
                    position: {lat: this.userList.musicians[i].location.coordinates[1], lng: this.userList.musicians[i].location.coordinates[0]},
                    map: this.map,
                    icon: image1,
                  });
                }
              }*/
              for (let i = 0; i < this.userList.musicians.length; i++) {
                if (this.userList.musicians[i].latitud != null && this.userList.musicians[i].longitud != null) {
                  this.markersListUsers[i] = new google.maps.Marker({
                    position: {lat: this.userList.musicians[i].latitud, lng: this.userList.musicians[i].longitud},
                    map: this.map,
                    icon: image1,
                  });
                  console.log("Marcador a " + this.userList.musicians[i].latitud)
                }
              }
              //Obtenim el click als usuaris
              for (let i = 0; i < this.markersListUsers.length; i++) {
                google.maps.event.addListener(this.markersListUsers[i], 'click', () =>{
                  console.log("Click al usuari " + this.userList.musicians[i].username)
                  this.userClicked=this.userList.musicians[i];
                  this.singleton.changeClickedUserId(this.userClicked._id);
                  this.router.navigateByUrl("/api/userInfo");
                });
              }
            }
            //Mostrem les sales
            if(this.salesFilter) {
              var image2 = {
                url: '../../../assets/markers/star-marker.png',
                scaledSize: new google.maps.Size(50, 50)
              };
              /*for (let i = 0; i < this.userList.rooms.length; i++) {
                if(this.userList.rooms[i].location=!null) {
                  this.markersListUsers[i]=new google.maps.Marker({
                    position: {lat: this.userList.musicians[i].location.coordinates[1], lng: this.userList.musicians[i].location.coordinates[0]},
                    map: this.map,
                    icon: image1,
                  });
                }
              }*/
              for (let i = 0; i < this.userList.rooms.length; i++) {
                if (this.userList.rooms[i].latitud != null && this.userList.rooms[i].longitud != null) {
                  this.markersListSalas[i] = new google.maps.Marker(
                    {
                      position: {lat: this.userList.rooms[i].latitud, lng: this.userList.rooms[i].longitud},
                      map: this.map,
                      icon: image2,
                    });
                  console.log("Marcador a " + this.userList.rooms[i].latitud)
                }
              }
              //Obtenim el click al les Sales
              for (let i = 0; i < this.markersListSalas.length; i++) {
                google.maps.event.addListener(this.markersListSalas[i], 'click', () =>{
                  console.log("Click a la sala " + this.userList.rooms[i].username)
                  this.salaClicked=this.userList.rooms[i];
                  this.singleton.changeClickedUserId(this.salaClicked._id);
                  this.router.navigateByUrl("/api/userInfo");
                });
              }
            }
          }
        },
        async err => {
          var result = err as HttpResponse<JSON>;
          if(result.status==403) {
            console.log("Error")
          }
        });
  }
  obtindreUsuarisFiltrats(){
    let token =localStorage.getItem('token');
    var filter = {
      distancia:this.distanciaValueFilter,
      latitud: this.latitud,
      longitud: this.longitud,
    };
    this.userService.getLocationsFiltered(token,filter)
      .subscribe(
        async response => {
          if(response.status==200) {
            this.userList=response.body;
            //Mostrem els musics
            if(this.musicsFilter) {
              var image1 = {
                url: '../../../assets/markers/music-marker.png',
                scaledSize: new google.maps.Size(50, 50)
              };
              /*for (let i = 0; i < this.userList.musicians.length; i++) {
                if(this.userList.musicians[i].location=!null) {
                  this.markersListUsers[i]=new google.maps.Marker({
                    position: {lat: this.userList.musicians[i].location.coordinates[1], lng: this.userList.musicians[i].location.coordinates[0]},
                    map: this.map,
                    icon: image1,
                  });
                }
              }*/
              for (let i = 0; i < this.userList.musicians.length; i++) {
                if (this.userList.musicians[i].latitud != null && this.userList.musicians[i].longitud != null) {
                  this.markersListUsers[i] = new google.maps.Marker({
                    position: {lat: this.userList.musicians[i].latitud, lng: this.userList.musicians[i].longitud},
                    map: this.map,
                    icon: image1,
                  });
                  console.log("Marcador a " + this.userList.musicians[i].latitud)
                }
              }
              //Obtenim el click als usuaris
              for (let i = 0; i < this.markersListUsers.length; i++) {
                google.maps.event.addListener(this.markersListUsers[i], 'click', () =>{
                  console.log("Click al usuari " + this.userList.musicians[i].username)
                  this.userClicked=this.userList.musicians[i];
                  this.singleton.changeClickedUserId(this.userClicked._id);
                  this.router.navigateByUrl("/api/userInfo");
                });
              }
            }
            //Mostrem les sales
            if(this.salesFilter) {
              var image2 = {
                url: '../../../assets/markers/star-marker.png',
                scaledSize: new google.maps.Size(50, 50)
              };
              /*for (let i = 0; i < this.userList.rooms.length; i++) {
                if(this.userList.rooms[i].location=!null) {
                  this.markersListUsers[i]=new google.maps.Marker({
                    position: {lat: this.userList.musicians[i].location.coordinates[1], lng: this.userList.musicians[i].location.coordinates[0]},
                    map: this.map,
                    icon: image1,
                  });
                }
              }*/
              for (let i = 0; i < this.userList.rooms.length; i++) {
                if (this.userList.rooms[i].latitud != null && this.userList.rooms[i].longitud != null) {
                  this.markersListSalas[i] = new google.maps.Marker(
                    {
                      position: {lat: this.userList.rooms[i].latitud, lng: this.userList.rooms[i].longitud},
                      map: this.map,
                      icon: image2,
                    });
                  console.log("Marcador a " + this.userList.rooms[i].latitud)
                }
              }
              //Obtenim el click al les Sales
              for (let i = 0; i < this.markersListSalas.length; i++) {
                google.maps.event.addListener(this.markersListSalas[i], 'click', () =>{
                  console.log("Click a la sala " + this.userList.rooms[i].username)
                  this.salaClicked=this.userList.rooms[i];
                  this.singleton.changeClickedUserId(this.salaClicked._id);
                  this.router.navigateByUrl("/api/userInfo");
                });
              }
            }
          }
        },
        async err => {
          var result = err as HttpResponse<JSON>;
          if(result.status==403) {
            console.log("Error")
          }
        });
  }

}
