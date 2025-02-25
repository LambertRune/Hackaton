import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { BicycleParkingService } from '../service/bicycleparkingService';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map: any;
  private bicycleParkingService: BicycleParkingService;

  constructor() {
    this.bicycleParkingService = new BicycleParkingService();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [50.82803, 3.26487],
      zoom: 13
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
    });
    tiles.addTo(this.map);
  }

  private async loadData(): Promise<void> {
    
    const data = await this.bicycleParkingService.getDetailsFiltered();
    const customIcon = L.icon({
    iconUrl:'assets/bikePicture.svg',  
    iconSize: [60, 60],                   // Icon size
      iconAnchor: [16, 32],                 // Position of the icon relative to marker
      popupAnchor: [0, -32]                 // Position of the popup
    });

    data.forEach((location: { latitude: number; longitude: number; source: any; capacity: any; isCovered: any; type: any; isFree: null; }) => {
      L.marker([location.latitude, location.longitude], { icon: customIcon })
        .addTo(this.map)
        .bindPopup(`
          <b>Bicycle Parking (${location.source})</b><br>
          ${location.capacity ? `Capacity: ${location.capacity}<br>` : ''}
          Covered: ${location.isCovered ? 'Yes' : 'No'}<br>
          ${location.type ? `Type: ${location.type}<br>` : ''}
          ${location.isFree !== null ? `Free: ${location.isFree ? 'Yes' : 'No'}` : ''}          
        `);
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.loadData(); // Load data and markers on map initialization
  }
}
