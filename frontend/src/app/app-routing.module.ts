import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { MyguardGuard } from "./myguard.guard";
import {RegistrationComponent} from "./components/registration/registration.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { GrupCreateComponent } from "./components/grup-create/grup-create.component";
import {LocationPickComponent} from "./components/location-pick/location-pick.component";
import { Chat1to1Component } from './components/chat1to1/chat1to1.component';
import {UserInfoComponent} from "./components/user-info/user-info.component";
import {RegistrationLocationComponent} from "./components/registration-location/registration-location.component";
import { ChatListComponent } from './components/main/pages/chat-list/chat-list.component';
import {FilterFormComponent} from "./components/filter-form/filter-form.component";
import {PoliticaComponent} from "./components/politica/politica.component";
import {GrupLocationComponent} from "./components/grup-location/grup-location.component";
import { JamCreateComponent } from "./components/jam-create/jam-create.component";
import { SalaInfoComponent } from './components/sala-info/sala-info.component';

const routes: Routes = [
  { path: 'api/signin', component: LoginComponent },
  { path: 'api/signup', component: RegistrationComponent },
  { path: 'api/settings', component: SettingsComponent, canActivate: [MyguardGuard] },
  { path: '', redirectTo: '/api/signin', pathMatch: 'full' },
  { path: 'api/menu', loadChildren: './components/main/menu/menu.module#MenuPageModule' },
  { path: 'api/grupCreate', component: GrupCreateComponent},
  { path: 'api/changeLocation', component: LocationPickComponent},
  { path: 'api/pickLocation', component: RegistrationLocationComponent},
  {path: 'api/chat1to1', component: Chat1to1Component},
  {path: 'api/userInfo', component: UserInfoComponent},
  {path: 'api/chats', component: ChatListComponent},
  {path: 'api/filter', component: FilterFormComponent},
  {path: 'api/politica', component: PoliticaComponent},
  { path: 'api/grupLocation', component: GrupLocationComponent},
  {path: 'api/jamCreate', component: JamCreateComponent},
  {path: 'api/salaInfo', component: SalaInfoComponent},

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
