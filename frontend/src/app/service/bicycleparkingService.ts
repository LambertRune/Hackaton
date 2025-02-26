import { Injectable, numberAttribute } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})

export class BicycleParkingService {
  private apiUrl = 'http://localhost:3000/api'; // Adjust port as needed
  private actionSignalUpdate = new Subject<void>();
  private actionSignalRouteUpdate = new Subject<void>();
  action2$ = this.actionSignalRouteUpdate.asObservable();
  action$ = this.actionSignalUpdate.asObservable();

  triggerMapUpdate(obj: any) {
    this.actionSignalUpdate.next(obj);
  }
  triggerRouteUpdate(obj:any) {
    this.actionSignalRouteUpdate.next(obj);
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
      console.log(minimumCapacity);
      const response = await axios.get(this.apiUrl+'/filter/all/?isCovered='+ isCovered+'&isFree='+isFree+'&minCapacity='+minimumCapacity);	  
         
      return response.data;
    }
    catch(error){
      console.error('Error'); 
      return [];
    }
  }

 
}