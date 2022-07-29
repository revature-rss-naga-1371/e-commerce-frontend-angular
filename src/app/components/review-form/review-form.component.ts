import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent implements OnInit {
  
  @Output() save = new EventEmitter();
  isFormOpen = false;
  reviewForm!: FormGroup

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.reviewForm = this.fb.group({
      stars: [3],
      body: ['', Validators.required],
      who: ['Denisse']
    })
  }
  toggle(){
    this.isFormOpen = !this.isFormOpen
  }

  handleSubmit() {
    if(this.reviewForm.valid) {
      let formModel= this.reviewForm.value
      this.save.emit(formModel)
      this.reviewForm.reset({
        stars: 1,
        body: '',
        who: 'Denisse'
      })
      this.toggle()
    }
  }


}
