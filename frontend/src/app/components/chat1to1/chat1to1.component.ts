import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.services'

@Component({
  selector: 'app-chat1to1',
  templateUrl: './chat1to1.component.html',
  styleUrls: ['./chat1to1.component.scss'],
})
export class Chat1to1Component implements OnInit {
  destination
  constructor(private singleton: DataService) {
    this.singleton.newChatDestination.subscribe(destination => this.destination = destination)
    console.log(this.destination)
  }

  ngOnInit() {}

}
