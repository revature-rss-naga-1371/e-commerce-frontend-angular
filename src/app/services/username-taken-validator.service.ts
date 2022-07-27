import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsernameTakenValidatorService {

  authUrl: string = `${environment.baseUrl}/auth`;
  loggedIn: boolean = false;

  constructor(private http: HttpClient) { }

  validateUsernameNotTaken(control: AbstractControl) {
    return this.checkUsernameNotTaken(control.value).pipe(
      map(res => {
        return res ? null : { usernameTaken: true}
      })
    )
  }

  checkUsernameNotTaken(username: string): Observable<boolean> {
    return this.http.get<any>(`${this.authUrl}/users`)
      .pipe(map((usernameList: Array<any>) => 
        usernameList.filter(user => user.email === username)
      ),
      map(users => !users.length)
      );
  }


}
