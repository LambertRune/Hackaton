import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapComponent } from "./map/map.component";
import { HttpClientModule } from '@angular/common/http';
import { BicycleParkingService } from './service/bicycleparkingService';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MapComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  private bicycleParkingService: BicycleParkingService;
  
    constructor() {
      this.bicycleParkingService = new BicycleParkingService();
    }
    loginPage() {
      
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
