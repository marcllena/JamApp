import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'api/menu/home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: 'home',
        loadChildren: '../pages/home/home.module#HomePageModule'
      },
      {
        path: 'gruplist',
        loadChildren: '../pages/grup-list/grup-list.module#GrupListPageModule'
      },
      {
        path: 'jamlist',
        loadChildren: '../pages/jam-list/jam-list.module#JamListPageModule'
      },
      {
        path: 'userlist',
        loadChildren: '../pages/userlist/userlist.module#UserlistPageModule'
      },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
