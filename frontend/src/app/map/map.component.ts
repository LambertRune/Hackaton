import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { BicycleParkingService } from '../service/bicycleparkingService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
}


)
export class MapComponent {
  private map: any;
  private subscription: Subscription;
  public isLoading: boolean;

  constructor(
    private bicycleParkingService: BicycleParkingService) 
    { 
      this.isLoading = false;
      this.subscription = this.bicycleParkingService.action$.subscribe((obj:any) => {
        console.log(obj);
        this.loadDataFiltered(obj.isCovered,obj.isfree,obj.minimumCapacity);
      });
    }
  

  private initMap(): void {
    this.map = L.map('map', {
      center: [50.82803, 3.26487],
      zoom: 13,
      maxZoom: 20
    });
    
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
      minZoom: 3,
      maxNativeZoom: 19
    });
    tiles.addTo(this.map);
  }
  private markers: L.Marker[] = [];
  
  private clearMarkers(): void {
    this.markers.forEach(marker => {
      this.map.removeLayer(marker);
    });
    this.markers = [];
  }
  private placeMarkers(data:any,customIcon:any):void{
    this.clearMarkers();
    data.forEach((location: { latitude: number; longitude: number; source: any; capacity: any; isCovered: any; type: any; isFree: null; }) => {
      const marker = L.marker([location.latitude, location.longitude], { icon: customIcon })
      .addTo(this.map)
      .bindPopup(`
        <b>Bicycle Parking (${location.source})</b><br>
        ${location.capacity ? `Capacity: ${location.capacity}<br>` : ''}
        Covered: ${location.isCovered ? 'Yes' : 'No'}<br>
        ${location.type ? `Type: ${location.type}<br>` : ''}
        ${location.isFree !== null ? `Free: ${location.isFree ? 'Yes' : 'No'}<br>` : ''}
        <a href="https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}&travelmode=bicycling" target="_blank">Open google maps</a>
      `);
      this.markers.push(marker);
      });
      // Store the marker reference
      
    }
    /*private addroute():void{
      L.Routing.control({
        waypoints: [
          L.latLng(57.74, 11.94),
          L.latLng(57.6792, 11.949)
        ]
      }).addTo(this.map);
    }*/
    private async loadData(): Promise<void> {
      this.isLoading = true;

      // Clear existing markers first
      this.clearMarkers()
      
      const data = await this.bicycleParkingService.getDetails();
      const customIcon = L.icon({
        iconUrl:'assets/bikePicture.svg',  
        iconSize: [60, 60],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]  
        
        
      });
      this.placeMarkers(data,customIcon);

      this.isLoading = false;
    }
    private async loadDataFiltered(isCovered:boolean,isFree:boolean,minCapacity:number): Promise<void> {
      this.isLoading = true;

      // Clear existing markers first
      this.clearMarkers();
      
      const data = await this.bicycleParkingService.getDetailsFiltered(true, true, minCapacity);
      const customIcon = L.icon({
        iconUrl:'assets/bikePicture.svg',  
        iconSize: [60, 60],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]  
        
        
      });
      this.placeMarkers(data,customIcon);
      
      this.isLoading = false;
    }
  
    
    ngOnInit(): void {
      this.initMap();
      this.loadData(); 
    }
  
    ngOnDestroy() {
      this.subscription.unsubscribe();
    }
  }
  
  