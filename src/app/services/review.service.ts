import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Review } from '../models/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private productUrl: string = "/api/product";

  constructor(private http: HttpClient) { }

  public getReviews(productId: number): Observable<Review[]>{
    return this.http.get<Review[]>(environment.baseUrl+'/api/review/'+productId, {headers: environment.headers, withCredentials: environment.withCredentials})
  }
  public newReview(reviewInfo: any){
    return this.http.post(environment.baseUrl+'api/reviews/'+'create-item', reviewInfo)
  }

}
