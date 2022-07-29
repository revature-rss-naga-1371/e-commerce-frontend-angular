import { Component, Input, OnInit } from '@angular/core';
import { ReviewService } from 'src/app/services/review.service';
import { Review } from 'src/app/models/review';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})

export class ReviewComponent implements OnInit {

  reviews: Array<Review> = []
  starRating: number = 0;

  @Input() productId!: number;
  
  isReviewFormOpen = false;
  formData: any;
  reviewForm!: FormGroup;
  


  constructor(
    private review : ReviewService
  ) { }

  ngOnInit(): void {
    console.log(this.productId)
      this.review.getReviews(this.productId).subscribe({
      
        next: (reviews: Array<Review>) => {
          this.reviews = reviews
        }
      })
  }
  toggle(){
    this.isReviewFormOpen = !this.isReviewFormOpen;
  }
  
  // handleNewReview(review: any) {
  //   console.log(review + "review component.ts")
  //   this.review.newReview(this.review)
  //     .subscribe({
  //       next: ((response:any) => {
  //         this.reviews.unshift(response)
  //       })
  //     })
  // }
  handleSubmit() {
    const product = {id: this.productId}
    this.formData = this.reviewForm.value
    this.formData.productId = this.productId
    console.log(this.formData)
    console.log(this.formData.product)
    if (this.reviewForm.valid) {
      let formModel = this.reviewForm.value
      this.review.newReview(this.formData)
      this.reviewForm.reset({
        rating:1,
        description: '',
        name:'Name'
      })
      this.toggle()
    }
  }
      

}
  
 



