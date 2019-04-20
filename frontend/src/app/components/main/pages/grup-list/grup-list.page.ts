import { Component, OnInit } from '@angular/core';
import {ToolbarService} from "../../../../services/toolbar.service";

@Component({
  selector: 'app-grup-list',
  templateUrl: './grup-list.page.html',
  styleUrls: ['./grup-list.page.scss'],
})
export class GrupListPage implements OnInit {

  constructor(private toolbarService: ToolbarService) { }

  ngOnInit() {
  }

}
