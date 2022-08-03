import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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
  @Output() cancel = new EventEmitter();


  reviewForm!: FormGroup;
  starRating: number = 0;
  num: number = 0;
  productReview: Review[]= [];
  formData: any;

  //Star Review
  stars = [1,2,3,4,5];
  ratingProduct = 1;
  hoverState = 0;

  constructor(
    private fb: FormBuilder,
    private review: ReviewService
  ) { }

  ngOnInit(): void {
    this.reviewForm = this.fb.group({
      // rating: [[],[Validators.required]],
      name: ['',[Validators.required]],
      description:['',[Validators.required]],
    });
    
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

  onStarEnter(starId: number){
    this.hoverState = starId;
  }

  onStarLeave(){
    this.hoverState = 0;
  }

  onStarClicked(starId: number){
    this.ratingProduct = starId;
    console.log(starId)
  }

  toggle(){
    this.cancel.emit()
  }

  handleSubmit() {
    console.log(this.productId)
    this.formData = this.reviewForm.value
    this.formData.productId = this.productId
    console.log(this.formData)
    console.log(this.formData.product)
    if (this.reviewForm.valid) {
      this.formData.rating = this.ratingProduct
      this.review.newReview(this.formData)
      this.reviewForm.reset({
        rating:1,
        description: '',
        name:''
      });
      this.toggle()
    }
  }
}