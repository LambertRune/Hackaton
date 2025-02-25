import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapComponent } from "./map/map.component";
import { BicycleParkingService } from "./service/bicycleparkingService";
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [ MapComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'frontend';
  locationsFiltered : any;
  constructor(private service: BicycleParkingService) {

    
  }

  ngOnInit() {
 
  }

  locationsFiltered1()
  {
    console.log( this.service.getDetailsFiltered(true, true, 10));
    this.locationsFiltered = this.service.getDetailsFiltered(true, true, 10);
  }
}
