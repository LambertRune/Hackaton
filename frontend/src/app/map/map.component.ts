import { Component, AfterViewInit, Inject } from '@angular/core';
import * as L from 'leaflet';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map: any;

  
  private initMap(): void {
    this.map = L.map('map', {
      center: [50.82803, 3.26487],
      zoom: 13
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    })
    tiles.addTo(this.map);
  }

  private addMarkers(): void {
    const customIcon = L.icon({
      iconUrl: 'assets/custom-marker.svg',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });
    const testLocations = [
      {
        latitude: 50.8562804,
        longitude: 3.3149583,
        capacity: "48",
        covered: "yes",
        type: "wall_loops"
      }
    ];
    testLocations.forEach(location => {
      L.marker([location.latitude, location.longitude])
        .addTo(this.map)
        .bindPopup(`
          <b>Bicycle Parking</b><br>
          Capacity: ${location.capacity}<br>
          Covered: ${location.covered}<br>
          Type: ${location.type}
        `);
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.addMarkers();
  }
}