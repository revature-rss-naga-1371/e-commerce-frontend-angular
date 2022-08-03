import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { AbstractControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl: string = `${environment.baseUrl}/auth`;
  loggedIn: boolean = false;

  isDark = false

  _isDark$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const payload = {email:email, password:password};
    return this.http.post<any>(`${this.authUrl}/login`, payload, {headers: environment.headers, withCredentials: environment.withCredentials});
  }

  logout(): void{
    this.http.post(`${this.authUrl}/logout`, null);
  }

  register(firstName: string, lastName: string, email: string, password: string): Observable<any> {
    const payload = {firstName: firstName, lastName: lastName, email: email, password: password};
    return this.http.post<any>(`${this.authUrl}/register`, payload, {headers: environment.headers});
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.authUrl}/users`);
  }

  changeIsDark(): void {
    this.isDark = !this.isDark
    this._isDark$.next(this.isDark)
  }

}
