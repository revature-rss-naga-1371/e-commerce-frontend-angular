import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreateItemService {

  apiUrl: string ="http://localhost:8080/"

  constructor(
    private httpClient: HttpClient
  ) {}

  newItem(itemInfo: any){
    return this.httpClient.patch(`${this.apiUrl}create-item`, itemInfo)
  }

  updateItem(itemInfo: any){
    return this.httpClient.patch(`${this.apiUrl}update-item`, itemInfo)
  }

  

}