import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { MyguardGuard } from "./myguard.guard";
import {RegistrationComponent} from "./components/registration/registration.component";
import { SettingsComponent } from './components/settings/settings.component';
import {UserlistComponent} from "./components/userlist/userlist.component";
import { GrupCreateComponent } from "./components/grup-create/grup-create.component";
import {LocationPickComponent} from "./components/location-pick/location-pick.component";
import { Chat1to1Component } from './components/chat1to1/chat1to1.component';
import {UserInfoComponent} from "./components/user-info/user-info.component";

const routes: Routes = [
  { path: 'api/signin', component: LoginComponent },
  { path: 'api/signup', component: RegistrationComponent },
  { path: 'api/settings', component: SettingsComponent, canActivate: [MyguardGuard] },
  { path: 'api/userlist', component: UserlistComponent, canActivate: [MyguardGuard] },
  { path: '', redirectTo: '/api/signin', pathMatch: 'full' },
  { path: 'api/menu', loadChildren: './components/main/menu/menu.module#MenuPageModule' },
  { path: 'api/grupCreate', component: GrupCreateComponent},
  { path: 'api/changeLocation', component: LocationPickComponent},
  {path: 'api/chat1to1', component: Chat1to1Component},
  {path: 'api/userInfo', component: UserInfoComponent},

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
