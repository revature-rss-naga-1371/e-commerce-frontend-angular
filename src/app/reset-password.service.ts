import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  apiUrl: string ="http://localhost:8080/resetPW"

    constructor(
      private httpClient: HttpClient
    ) { }

    savePassword(passwordInfo: any){
      return this.httpClient.patch(`${this.apiUrl}`, passwordInfo)
    }
}
