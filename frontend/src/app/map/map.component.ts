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
      iconUrl: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDMwMDAgMzAwMCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxuczpzZXJpZj0iaHR0cDovL3d3dy5zZXJpZi5jb20vIiBzdHlsZT0iZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjI7Ij4KICAgIDxnIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsMTQsMTQ5KSI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxnIHRyYW5zZm9ybT0ibWF0cml4KDAuNzE1MDc1LDAsMCwwLjY5NzI4MSwzMTIuMzEzLDI1MC4xMDkpIj4KICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PSIxNjg0IiBjeT0iMTE2MS41IiByeD0iOTk1IiByeT0iOTc0LjUiLz4KICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8ZyB0cmFuc2Zvcm09Im1hdHJpeCgwLjU5MjE4MywwLDAsMC41ODk1OTQsNTI1LjY5OSwzNzUuMTg3KSI+CiAgICAgICAgICAgICAgICA8ZWxsaXBzZSBjeD0iMTY4NCIgY3k9IjExNjEuNSIgcng9Ijk5NSIgcnk9Ijk3NC41IiBzdHlsZT0iZmlsbDp3aGl0ZTsiLz4KICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8ZyB0cmFuc2Zvcm09Im1hdHJpeCgtMC43NTY4ODIsMC4wMDMwNDQ3MywtMC4wMDQwMjI3LC0wLjk5OTk5MiwyNzM1LjQ0LDQ2ODQuMDMpIj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xNTc0LjQ5LDIyNjcuOTNMMjQyNS45OSwzMzE5LjdDMjE4OS43MiwzMDg3Ljc0IDE5NDcuNjksMzAxMC42MyAxNzAyLjE1LDI5ODcuN0MxNDAwLjcyLDI5NTkuNTYgMTEyNC40OSwyOTgxLjU0IDc2MS4zNTYsMzMwNi4yN0wxNTc0LjQ5LDIyNjcuOTNaIi8+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+CiAgICA8ZyB0cmFuc2Zvcm09Im1hdHJpeCgxLDAsMCwxLDYsMTA2KSI+CiAgICAgICAgPGNpcmNsZSBjeD0iMTI3OS41IiBjeT0iMTIwMy41IiByPSIyMy41IiBzdHlsZT0iZmlsbDp3aGl0ZTsiLz4KICAgICAgICA8ZyB0cmFuc2Zvcm09Im1hdHJpeCgwLjc1NjI1LDAsMCwwLjkwOTA5MSw0MDQuMDQ0LDE1MC44MTgpIj4KICAgICAgICAgICAgPHJlY3QgeD0iMTMxMyIgeT0iOTAwIiB3aWR0aD0iNDgwIiBoZWlnaHQ9IjU1Ii8+CiAgICAgICAgPC9nPgogICAgICAgIDxnIHRyYW5zZm9ybT0ibWF0cml4KDAuMzY2MjM4LC0wLjQ4NzQ3OSwwLjY3MjQ1NywwLjUwNTIxLDEzNC41ODUsMTM4Ny44NikiPgogICAgICAgICAgICA8cmVjdCB4PSIxMzEzIiB5PSI5MDAiIHdpZHRoPSI0ODAiIGhlaWdodD0iNTUiLz4KICAgICAgICA8L2c+CiAgICAgICAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoLTAuMTg4NzM4LC0wLjU3OTc3OSwwLjgwOTU3MywtMC4yNjM1NDQsMTMxNS43OSwyMTY5Ljk0KSI+CiAgICAgICAgICAgIDxyZWN0IHg9IjEzMTMiIHk9IjkwMCIgd2lkdGg9IjQ4MCIgaGVpZ2h0PSI1NSIvPgogICAgICAgIDwvZz4KICAgICAgICA8ZyB0cmFuc2Zvcm09Im1hdHJpeCgwLjI4MzI3NiwtNS41NTExMmUtMTcsMS4zODc3OGUtMTYsMC41NDU0NTUsMTI0MS4zOCwzODMuMDkxKSI+CiAgICAgICAgICAgIDxyZWN0IHg9IjEzMTMiIHk9IjkwMCIgd2lkdGg9IjQ4MCIgaGVpZ2h0PSI1NSIvPgogICAgICAgIDwvZz4KICAgICAgICA8ZyB0cmFuc2Zvcm09Im1hdHJpeCgwLjI4MzI3NiwtNS41NTExMmUtMTcsMS4zODc3OGUtMTYsMC41NDU0NTUsMTI0MS4zOCwzODMuMDkxKSI+CiAgICAgICAgICAgIDxyZWN0IHg9IjEzMTMiIHk9IjkwMCIgd2lkdGg9IjQ4MCIgaGVpZ2h0PSI1NSIvPgogICAgICAgIDwvZz4KICAgICAgICA8ZyB0cmFuc2Zvcm09Im1hdHJpeCgwLjIyNDk0MywtNy4yMTY0NWUtMTcsMS4xMDJlLTE2LDAuNzA5MDkxLDEwMTUuOTcsMjY5LjgxOCkiPgogICAgICAgICAgICA8cmVjdCB4PSIxMzEzIiB5PSI5MDAiIHdpZHRoPSI0ODAiIGhlaWdodD0iNTUiLz4KICAgICAgICA8L2c+CiAgICAgICAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoMC4zMDE0MjUsMC41MDgyMywtMC40NjkxNDgsMC4yNzgyNDYsMTM5OS45OSwtMC44NTQ4NzMpIj4KICAgICAgICAgICAgPHJlY3QgeD0iMTMxMyIgeT0iOTAwIiB3aWR0aD0iNDgwIiBoZWlnaHQ9IjU1Ii8+CiAgICAgICAgPC9nPgogICAgICAgIDxnIHRyYW5zZm9ybT0ibWF0cml4KDAuMzAwMTksMC41MDYxNDcsLTAuNjUwOTY2LDAuMzg2MDgsMTU2NS4yNSwtOTUuMTcwMikiPgogICAgICAgICAgICA8cmVjdCB4PSIxMzEzIiB5PSI5MDAiIHdpZHRoPSI0ODAiIGhlaWdodD0iNTUiLz4KICAgICAgICA8L2c+CiAgICAgICAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoLTAuNTgzNzQ2LDAuMzQwMjUxLDAuMzYyNDIyLDAuNjIxNzg1LDIyMDMuMTcsLTIyLjk3NDcpIj4KICAgICAgICAgICAgPHJlY3QgeD0iMTMxMyIgeT0iOTAwIiB3aWR0aD0iNDgwIiBoZWlnaHQ9IjU1Ii8+CiAgICAgICAgPC9nPgogICAgICAgIDxnIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsNzQsLTQ4KSI+CiAgICAgICAgICAgIDxjaXJjbGUgY3g9IjEyMTUuNSIgY3k9IjEyNTMuNSIgcj0iMTI2LjUiLz4KICAgICAgICAgICAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoMC42NDAzMTYsMCwwLDAuNjQwMzE2LDQzNi42OTYsNDUwLjM2NCkiPgogICAgICAgICAgICAgICAgPGNpcmNsZSBjeD0iMTIxNS41IiBjeT0iMTI1My41IiByPSIxMjYuNSIgc3R5bGU9ImZpbGw6d2hpdGU7Ii8+CiAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoMC4yNDExMDcsMCwwLDAuMjQxMTA3LDkyMi40MzUsOTQ4LjI3MykiPgogICAgICAgICAgICAgICAgPGNpcmNsZSBjeD0iMTIxNS41IiBjeT0iMTI1My41IiByPSIxMjYuNSIvPgogICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDxnIHRyYW5zZm9ybT0ibWF0cml4KDAuMjQxMTA3LDAsMCwwLjI0MTEwNywxMzk1LjQzLDk0OC4yNzMpIj4KICAgICAgICAgICAgICAgIDxjaXJjbGUgY3g9IjEyMTUuNSIgY3k9IjEyNTMuNSIgcj0iMTI2LjUiLz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgICAgICA8ZyB0cmFuc2Zvcm09Im1hdHJpeCgxLDAsMCwxLDU0NCwtNDgpIj4KICAgICAgICAgICAgPGNpcmNsZSBjeD0iMTIxNS41IiBjeT0iMTI1My41IiByPSIxMjYuNSIvPgogICAgICAgICAgICA8ZyB0cmFuc2Zvcm09Im1hdHJpeCgwLjY0MDMxNiwwLDAsMC42NDAzMTYsNDM1LjY5Niw0NTAuODY0KSI+CiAgICAgICAgICAgICAgICA8Y2lyY2xlIGN4PSIxMjE1LjUiIGN5PSIxMjUzLjUiIHI9IjEyNi41IiBzdHlsZT0iZmlsbDp3aGl0ZTsiLz4KICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8ZyB0cmFuc2Zvcm09Im1hdHJpeCgwLjI1Mjk2NCwwLDAsMC4yNTI5NjQsOTA3LjUyMiw5MzQuOTA5KSI+CiAgICAgICAgICAgICAgICA8Y2lyY2xlIGN4PSIxMjE1LjUiIGN5PSIxMjUzLjUiIHI9IjEyNi41Ii8+CiAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoMC4yODg1MzgsMCwwLDAuMjg0NTg1LDYwNS43ODMsODQxLjI3MykiPgogICAgICAgICAgICAgICAgPGNpcmNsZSBjeD0iMTIxNS41IiBjeT0iMTI1My41IiByPSIxMjYuNSIvPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K',  // Custom icon path
      iconSize: [60, 60],                   // Icon size
      iconAnchor: [16, 32],                 // Position of the icon relative to marker
      popupAnchor: [0, -32]                 // Position of the popup
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

  ngAfterViewInit(): void {
    this.initMap();
    this.loadData(); // Load data and markers on map initialization
  }
}
