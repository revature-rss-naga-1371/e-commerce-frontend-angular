import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  apiUrl: string ="http://localhost:8080/auth/resetPW"

    constructor(
      private httpClient: HttpClient
    ) { }

    savePassword(passwordInfo: any){
      return this.httpClient.patch(`${this.apiUrl}`, passwordInfo)
    }

    passwordMatchValidator(password: any, confirmPassword: any) {
      return (group: FormGroup) => {
  
        const passwordInput = group.controls[password]
        const passwordConfirmationInput = group.controls[confirmPassword];
  
        if (passwordInput.errors && passwordConfirmationInput.errors?.['mismatch']) {
          return
        }
        
        if (passwordInput.value !== passwordConfirmationInput.value) {
          passwordConfirmationInput.setErrors({ passwordMatchValidator: true })
        }
        else {
          passwordConfirmationInput.setErrors(null)
        }
      }
    }
}
