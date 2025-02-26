import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BicycleParkingService } from '../../service/bicycleparkingService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  responsecode: string;
  private bicycleParkingService: BicycleParkingService;
  constructor() {
    this.responsecode = "201";
    this.bicycleParkingService = new BicycleParkingService();
  }

  
 async Login(NaamUser: string) {
    cred = {
      username: NaamUser,
      password: "pass"
    }
    this.responsecode = (await this.bicycleParkingService.sendLogin(cred)).toString();
  }
}
let cred = {
  username: "gilles",
  password: "iets"
};
