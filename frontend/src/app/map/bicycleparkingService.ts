import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BicycleParkingService {
  private apiUrl = 'http://localhost:3000/api/bicycle-parking'; // Adjust port as needed

  constructor(private http: HttpClient) { }

  getBicycleParking(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}