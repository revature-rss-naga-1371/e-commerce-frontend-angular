import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateItemService } from 'src/app/services/create-item.service';
import { Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.css']
})
export class CreateItemComponent implements OnInit {

  createItem! : FormGroup

  constructor(
    private fb: FormBuilder,
    private createItemService : CreateItemService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  pricePattern = "^\d*(\.\d{2})"

  ngOnInit(): void {
    this.createItem = this.fb.group({
      description   : [],
      image  : ['', Validators.required],
      name   : ['', Validators.required],
      price : ['', [Validators.required, Validators.pattern(/^\d*(\.\d{2})/)]],
      quantity : ['', [Validators.required, Validators.min(0)]]
  })
  }

  addItem() {
    if (this.createItem.valid) {
      let itemModel = this.createItem.value
      console.log(itemModel)      
      this.createItemService.newItem(itemModel)
      .subscribe({
        next: (response: any) => {
          console.log(response)
        }
      })
      this.router.navigate(['/home']);
  }

}


}
