import { Component, OnInit } from '@angular/core';
import {ToolbarService} from "../../../../services/toolbar.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private toolbarService: ToolbarService) { }

  ngOnInit() {
  }

}
