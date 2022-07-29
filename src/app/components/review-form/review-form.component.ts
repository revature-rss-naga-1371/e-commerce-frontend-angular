import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ReviewService } from 'src/app/services/review.service';
import { Review } from 'src/app/models/review';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent implements OnInit {
  @Input() productId!: number;
  @Output() save = new EventEmitter();
  isReviewFormOpen = false;
  reviewForm!: FormGroup;
  starRating: number = 0;
  num: number = 0;
  productReview: Review[]= [];
  formData: any;


  constructor(
    private fb: FormBuilder,
    private review: ReviewService
  ) { }

  ngOnInit(): void {
    this.reviewForm = this.fb.group({
      rating: [[],[Validators.required, Validators.max(5),Validators.min(1)]],
      name: ['',[Validators.required, Validators.maxLength(50)]],
      description:['',[Validators.required, Validators.maxLength(250)]],
    })
    
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
    

toggle(){
  this.isReviewFormOpen = !this.isReviewFormOpen;
}


handleSubmit() {
  console.log(this.productId)
  this.formData = this.reviewForm.value
  this.formData.productId = this.productId
  console.log(this.formData)
  console.log(this.formData.product)
  if (this.reviewForm.valid) {
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