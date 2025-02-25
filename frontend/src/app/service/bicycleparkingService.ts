import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class BicycleParkingService {
  private apiUrl = 'http://localhost:3000/api/details/all'; // Adjust port as needed

  async getDetails(){
    try{
      const response = await axios.get(this.apiUrl);
      return response.data;
    }
    catch(error){
      console.error('Error'); 
      return [];
    }
  }
 
}