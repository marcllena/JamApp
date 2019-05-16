import { Component, OnInit } from '@angular/core';
import {WebsocketsService} from "../../../services/websockets.service";
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  private userType: string;

  public mainPages = [
    {
      title: 'Home',
      url: 'home',
      icon: 'home',
      type: 'User'
    },
    {
      title: 'Groups',
      url: 'gruplist',
      icon: 'people',
      type: 'User'
    },
    {
      title: 'Jam Sessions',
      url: 'jamlist',
      icon: 'musical-notes',
      type: 'User'
    },

    {
      title: 'User List',
      url: 'userlist',
      icon: 'contacts',
      type: 'User'
    },
  ];

  constructor(public websockets: WebsocketsService) { }

  ngOnInit() {
    this.userType=localStorage.getItem('userType');
    this.websockets.init();
  }

}
