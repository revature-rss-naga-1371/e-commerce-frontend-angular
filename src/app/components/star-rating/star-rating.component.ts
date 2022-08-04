import { Component, Input, OnInit } from '@angular/core';
import { map, reduce } from 'rxjs/operators';
import { ReviewService } from 'src/app/services/review.service';
import { Review} from 'src/app/models/review'; 
import { from } from 'rxjs';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnInit {
  starRating: number = 0;
  num: number = 0;
  @Input() productId!: number;

  constructor(
    private review : ReviewService
  ) { }

  ngOnInit(): void {
      this.review.getReviews(this.productId).subscribe(
        (subreview) => {
          if(subreview.length > 0) {
        for (const iterator of subreview) {
         this.starRating += iterator.rating;
         this.num++;
        }
        this.starRating = this.starRating / this.num;
        this.starRating = Math.round(this.starRating)}},
        (err) => console.log(err),
        () => console.log("complete")
        )

  }

}

