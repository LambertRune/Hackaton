import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';

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
  private subscription2: Subscription;
  public isLoading: boolean;
  title = 'frontend';  
  minCapacity: number = 0;
  iscovered: boolean = false;
  isfree: boolean = false;

  constructor(private service: BicycleParkingService) {
      this.isLoading = false;
      this.subscription = this.service.action$.subscribe((obj:any) => {
        console.log(obj);
        this.loadDataFiltered(obj.isCovered,obj.isfree,obj.minimumCapacity);
      });
      this.subscription2 = this.service.action2$.subscribe((obj:any) => {
        this.addroute(obj.latitude,obj.longitude);
      });
      window.addEventListener('addRoute', ((e: any) => {
        const { lat, lng } = e.detail;
        this.addroute(lat, lng);
      }) as EventListener);
    }
    triggerMapUpdate() {
      // Add your logic here
      console.log("Map update triggered");
    }
    locationsFiltered1(isCovered:boolean, isFree:boolean, minimumCapacity:number)
    {    
      this.service.triggerMapUpdate({isCovered:isCovered, isFree:isFree, minimumCapacity:minimumCapacity});
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
        
        <button onclick="window.dispatchEvent(new CustomEvent('addRoute', 
          { detail: { lat: ${location.latitude}, lng: ${location.longitude} } }))">
          Route
        </button>
      `);
      this.markers.push(marker);
      });
      // Store the marker reference
      
    }
    public addroute(latitude: number, longitude: number): void {
      console.log(latitude, longitude);
      this.clearMarkers();
      this.map.locate({ setView: true, maxZoom: 16 });
      this.map.on('locationfound', (e: any) => {
        const currentLocation = e.latlng;
        const fromIcon = L.icon({
          iconUrl: 'assets/person.svg',
          iconSize: [60, 60],
          iconAnchor: [30, 60],
          popupAnchor: [0, -60]
        });
        const toIcon = L.icon({
          iconUrl: 'assets/bikePicture.svg',
          iconSize: [60, 60],
          iconAnchor: [30, 60],
          popupAnchor: [0, -60]
        });

        //L.marker([currentLocation.lat, currentLocation.lng], { icon: fromIcon }).addTo(this.map);
        //L.marker([latitude, longitude], { icon: toIcon }).addTo(this.map);

        L.Routing.control({
          waypoints: [
            L.latLng(currentLocation.lat, currentLocation.lng),
            L.latLng(latitude, longitude)
          ]
        }).addTo(this.map);
      });
      this.map.on('locationerror', () => {
        console.error('Unable to retrieve your location');
      });
    }
    private async loadData(): Promise<void> {
      this.isLoading = true;

      // Clear existing markers first
      this.clearMarkers()
      
      const data = await this.service.getDetails();
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
      
      const data = await this.service.getDetailsFiltered(true, true, minCapacity);
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
      this.subscription2.unsubscribe();
      window.removeEventListener('addRoute', ((e: any) => {
        const { lat, lng } = e.detail;
        this.addroute(lat, lng);
      }) as EventListener);

    }
  }
  
  