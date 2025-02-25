import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map:any;

  private initMap(): void {
    this.map = L.map('map', {
      center: [39.8282, -98.5795], // Centered on the US
      zoom: 4
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
  }

  private addMarkers(): void {
    const customIcon = L.icon({
      iconUrl: 'assets/custom-marker.svg', // Path to your image
      iconSize: [32, 32], // Size of the icon
      iconAnchor: [16, 32], // Anchor point of the icon
      popupAnchor: [0, -32] // Position of the popup
    });
    // Example markers
    const locations = [
      { lat: 40.7128, lng: -74.0060, popup: "New York City" },
      { lat: 34.0522, lng: -118.2437, popup: "Los Angeles" },
      { lat: 41.8781, lng: -87.6298, popup: "Chicago" }
    ];

    locations.forEach(location => {
      // Add the marker with custom icon
      L.marker([location.lat, location.lng], { icon: customIcon })
      .addTo(this.map)
      .bindPopup(location.popup);

    });
  }
  ngAfterViewInit(): void {
    this.initMap();
    this.addMarkers();
  }
}
