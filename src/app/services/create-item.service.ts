import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreateItemService {

  apiUrl: string ="http://localhost:8080/api/product"

  constructor(
    private httpClient: HttpClient
  ) {}

  newItem(itemInfo: any){
    return this.httpClient.put(`${this.apiUrl}`, itemInfo, {headers: environment.headers, withCredentials: environment.withCredentials})
  }

  updateItem(itemInfo: any){
    return this.httpClient.put(`${this.apiUrl}`, itemInfo, {headers: environment.headers, withCredentials: environment.withCredentials})
  }

}