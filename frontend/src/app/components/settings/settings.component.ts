import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private settingsService: SettingsService,private router: Router) { }

  ngOnInit() {
  }

  goBack() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('');
  }

}
