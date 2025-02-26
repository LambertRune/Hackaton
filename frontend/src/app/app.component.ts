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
  minCapacity: number = 0;
  iscovered: boolean = false;
  isfree: boolean = false;
  constructor(private service: BicycleParkingService) {

    
  }

  triggerMapUpdate() {
    // Add your logic here
    console.log("Map update triggered");
  }

  ngOnInit() {
 
  }
  addroute(){
    this.addroute
  }
  locationsFiltered1(isCovered:boolean, isFree:boolean, minimumCapacity:number)
  {
    //this.service.triggerMapUpdate();
    // console.log( this.service.getDetailsFiltered(true, true, 10));
    //this.service.getDetailsFiltered(isCovered, this.isfree, minimumCapacity);
    this.service.triggerMapUpdate({isCovered:isCovered, isFree:isFree, minimumCapacity:minimumCapacity});
    console.log("aaaaaaaa")
    
  }
}
