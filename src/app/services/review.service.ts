import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
  public newReview(reviewInfo: Review){
    return this.http.post(environment.baseUrl+'/api/review/'+'create-review', reviewInfo, {headers: environment.headers})
    .subscribe(
      (resp) => console.log(resp),
      (err) => console.log(err),
      () => console.log("Review Sent")
    )
  }

}
