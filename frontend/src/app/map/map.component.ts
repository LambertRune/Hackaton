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
    const data = await this.bicycleParkingService.getDetails();
    const customIcon = L.icon({
      iconUrl: 'assets/custom-marker.svg',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });

    data.forEach((location: { latitude: number; longitude: number; source: any; capacity: any; covered: any; type: any; isFree: null; }) => {
      L.marker([location.latitude, location.longitude], { icon: customIcon })
        .addTo(this.map)
        .bindPopup(`
          <b>Bicycle Parking (${location.source})</b><br>
          ${location.capacity ? `Capacity: ${location.capacity}<br>` : ''}
          Covered: ${location.covered ? 'Yes' : 'No'}<br>
          ${location.type ? `Type: ${location.type}<br>` : ''}
          ${location.isFree !== null ? `Free: ${location.isFree ? 'Yes' : 'No'}` : ''}          
        `);
    });
  }

  private addMarkers(): void {
    const customIcon = L.icon({
      iconUrl: 'assets/custom-marker.svg',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });

    
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.loadData(); // Changed from addMarkers() to loadData()
  }
}