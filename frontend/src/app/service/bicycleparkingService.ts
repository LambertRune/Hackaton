import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})

export class BicycleParkingService {
  private apiUrl = 'http://localhost:3000/api'; // Adjust port as needed
  private actionSignalUpdate = new Subject<void>();
  action$ = this.actionSignalUpdate.asObservable();

  triggerMapUpdate() {
    this.actionSignalUpdate.next();
  }


  public async getDetails(){
    try{
      const response = await axios.get(this.apiUrl+'/details/all');
      return response.data;
    }
    catch(error){
      console.error('Error'); 
      return [];
    }
  }
  public async getDetailsFiltered(isCovered:boolean, isFree:boolean, minimumCapacity:number){
    try{
      const response = await axios.get(this.apiUrl+'/filter/all/?isCovered=true&isFree=true&minCapacity=10');	
      return response.data;
    }
    catch(error){
      console.error('Error'); 
      return [];
    }
  }

 
}