import { Component, OnInit } from '@angular/core';
import {ToolbarService} from "../../../../services/toolbar.service";
import {Platform} from "@ionic/angular";

@Component({
  selector: 'app-jam-list',
  templateUrl: './jam-list.page.html',
  styleUrls: ['./jam-list.page.scss'],
})
export class JamListPage implements OnInit {

  constructor(private toolbarService: ToolbarService, public platform: Platform) { }

  ngOnInit() {
  }

}
