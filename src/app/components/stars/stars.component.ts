import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Review } from 'src/app/models/review';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit {

  @Input() starId!: number;
  @Input() ratingProduct = 1;

  @Output() starEnter: EventEmitter<number> = new EventEmitter();
  @Output() starLeave: EventEmitter<number> = new EventEmitter();
  @Output() starClicked: EventEmitter<number> = new EventEmitter();

  constructor(  ) { }

  ngOnInit(): void {}
  
  onStarEnter(){
    this.starEnter.emit(this.starId);
  }

  onStarLeave(){
    this.starLeave.emit();
  }
  
  onStarClicked(){
    this.starClicked.emit(this.starId)
  }

}
