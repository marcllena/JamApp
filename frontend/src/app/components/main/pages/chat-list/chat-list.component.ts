import { Component, OnInit } from '@angular/core';
import { ToolbarService } from 'src/app/services/toolbar.service';
import { WebsocketsService } from 'src/app/services/websockets.service';
import { DataService } from 'src/app/services/data.services';
import {Router} from "@angular/router";
import {Platform} from "@ionic/angular";
@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss','../../../../res/fonts/util.css','../../../../res/vendor/bootstrap/css/bootstrap.min.css','../../../../res/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
    '../../../../res/fonts/iconic/css/material-design-iconic-font.min.css','../../../../res/vendor/animate/animate.css','../../../../res/vendor/css-hamburgers/hamburgers.min.css', '../../../../res/vendor/animsition/css/animsition.min.css',
    '../../../../res/vendor/select2/select2.min.css','../../../../res/vendor/daterangepicker/daterangepicker.css']
})
export class ChatListComponent implements OnInit {
  chats;
  constructor(private toolbarService: ToolbarService, private websockets: WebsocketsService,
              private singleton: DataService, private router: Router, public platform: Platform) {
  this.websockets.newChats.subscribe(chats => {
    this.chats = chats
    console.log(this.chats)
  });
  }
  ngOnInit() {
    this.websockets.conversations();
  }
  chat(name) {
    this.singleton.changeChatDestination(name)
    this.router.navigateByUrl("/api/chat1to1")
  }
}
