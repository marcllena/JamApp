import { Component, OnInit } from '@angular/core';
import { ToolbarService } from 'src/app/services/toolbar.service';
import { WebsocketsService } from 'src/app/services/websockets.service';
import { DataService } from 'src/app/services/data.services';
import {Router} from "@angular/router";

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent implements OnInit {
  chats
  constructor(private toolbarService: ToolbarService, private websockets: WebsocketsService, private singleton: DataService, private router: Router) { 
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
