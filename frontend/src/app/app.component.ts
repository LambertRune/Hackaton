import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MapComponent } from "./map/map.component";
import { HttpClientModule } from '@angular/common/http';
import { BicycleParkingService } from './service/bicycleparkingService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MapComponent, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  private bicycleParkingService: BicycleParkingService;
  private router: Router;
    constructor() {
      this.router = new Router();
      this.bicycleParkingService = new BicycleParkingService();
    }
  login(NaamUser: string) {
    cred = {
      username: NaamUser,
      password: "pass"
    }
    this.bicycleParkingService.sendLogin(cred);
  }
}
let cred = {
  username: "gilles",
  password: "iets"
};
