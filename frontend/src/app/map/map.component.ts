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

  constructor(
    private bicycleParkingService: BicycleParkingService) 
    { 
      this.isLoading = false;
      this.subscription = this.bicycleParkingService.action$.subscribe((obj:any) => {
        console.log(obj);
        this.loadDataFiltered(obj.isCovered,obj.isfree,obj.minimumCapacity);
      });
      this.subscription2 = this.bicycleParkingService.action2$.subscribe((obj:any) => {
        this.addroute(obj.latitude,obj.longitude);
      });
      window.addEventListener('addRoute', ((e: any) => {
        const { lat, lng } = e.detail;
        this.addroute(lat, lng);
      }) as EventListener);
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
        <br>
        <button onclick="window.dispatchEvent(new CustomEvent('addRoute', 
          { detail: { lat: ${location.latitude}, lng: ${location.longitude} } }))">
          Route to here
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

        /*L.marker([currentLocation.lat, currentLocation.lng], { icon: fromIcon }).addTo(this.map);
        L.marker([latitude, longitude], { icon: toIcon }).addTo(this.map);*/

        // L.Routing.plan(
        //   [
        //     new L.Routing.Waypoint(L.latLng(latitude, longitude), "Bestemming", {}),
        //     new L.Routing.Waypoint(L.latLng(currentLocation.lat, currentLocation.lng), "Uw locatie", {}),
            
        //   ],
        //   { 
        //     dragStyles:
        //     [{color: 'red', opacity: 1, weight: 7}, {color: 'white', opacity: 0.8, weight: 4}, {color: 'orange', opacity: 1, weight: 2, dashArray: '7,12'}],
        //     createMarker:function(i, wp, nWps){
        //     if (i === 0) {
        //     return L.marker(wp.latLng, {icon: fromIcon });
        //     }
        //     else{
        //     return L.marker(wp.latLng, {icon: toIcon });
        //     }
        //   }
        // }
        // ).addTo(this.map);
        L.Routing.control({
          waypoints: [
            L.latLng(currentLocation.lat, currentLocation.lng),
            L.latLng(latitude, longitude)
          ],
          routeWhileDragging: true,
          lineOptions: {
            styles: [
              { color: 'red', opacity: 1, weight: 7 },
              { color: 'white', opacity: 0.8, weight: 4 },
              { color: 'orange', opacity: 1, weight: 2, dashArray: '7,12' }
            ],
            extendToWaypoints: true,
            missingRouteTolerance: 1
          },
          plan: L.Routing.plan(
            [
              L.Routing.waypoint(L.latLng(currentLocation.lat, currentLocation.lng), "Uw locatie"),
              L.Routing.waypoint(L.latLng(latitude, longitude), "Bestemming")
            ],
            {
              createMarker: function (i, wp) {
                if (i === 0) {
                  return L.marker(wp.latLng, { icon: fromIcon });
                } else {
                  return L.marker(wp.latLng, { icon: toIcon });
                }
              }
            }
          ),
          router: L.Routing.osrmv1({
            serviceUrl: 'https://router.project-osrm.org/route/v1'
          })
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
      this.subscription2.unsubscribe();
      window.removeEventListener('addRoute', ((e: any) => {
        const { lat, lng } = e.detail;
        this.addroute(lat, lng);
      }) as EventListener);

    }
  }
  
  