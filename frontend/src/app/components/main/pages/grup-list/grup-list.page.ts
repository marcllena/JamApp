import { Component, OnInit } from '@angular/core';
import {ToolbarService} from "../../../../services/toolbar.service";
import { UserServices } from "../../../../services/user.services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-grup-list',
  templateUrl: './grup-list.page.html',
  styleUrls: ['./grup-list.page.scss']
})
export class GrupListPage implements OnInit {

  groups: Object;

  constructor(private toolbarService: ToolbarService, private router: Router,private userService: UserServices) { }

  ngOnInit() {
  }

  llistaGrups(){
    console.log("Operacio de demanar grups realitzada al Backend: ");
    this.userService.obtainGroups()
      .subscribe(response =>{
        console.log("Resposta del backend"+response.body);
        if(response.status==200){
          this.groups = response.body;
        }
        else{
          console.log("Error desconegut");
        }
      },
      err=>{
        console.log("Error del backed: "+ err);
      });
  }

  requestMembership(){}

  createGroup(){}

}
