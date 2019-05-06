import { Component, OnInit } from '@angular/core';
import {WebsocketsService} from "../../../services/websockets.service";
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  public mainPages = [
    {
      title: 'Home',
      url: 'home',
      icon: 'home'
    },
    {
      title: 'Groups',
      url: 'gruplist',
      icon: 'people'
    },
    {
      title: 'Jam Sessions',
      url: 'jamlist',
      icon: 'musical-notes'
    },
  ];

  constructor(public websockets: WebsocketsService) { }

  ngOnInit() {
    this.websockets.init();
  }

}
