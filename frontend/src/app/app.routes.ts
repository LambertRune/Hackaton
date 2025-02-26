import { provideRouter, Routes } from '@angular/router';
import {LoginComponent} from './login/login/login.component';
import {MapComponent} from './map/map.component';
import { ApplicationConfig } from '@angular/core';

export const routes: Routes = [
    { path: 'Login', component: LoginComponent },
    { path: 'Map', component: MapComponent }
];

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes)]
  };
