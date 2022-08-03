import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { Review } from 'src/app/models/review';
import { ReviewService } from 'src/app/services/review.service';


@Component({
  selector: 'app-review-panel',
  templateUrl: './review-panel.component.html',
  styleUrls: ['./review-panel.component.css']
})
export class ReviewPanelComponent implements OnInit {

  @Output() save = new EventEmitter();
  isFormOpen = false;
  reviewForm!: FormGroup
  formData: any;
  @Input() productId!: number;
  reviews: Review[] = [];
  constructor(
    private review : ReviewService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.reviewForm = this.fb.group({
      rating: [''],
      description: ['', Validators.required],
      name: ['Name']
    })
  }
  toggle() {
    this.isFormOpen = !this.isFormOpen;
  }
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
