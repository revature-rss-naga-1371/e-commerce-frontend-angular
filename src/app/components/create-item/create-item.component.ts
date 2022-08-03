import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateItemService } from 'src/app/services/create-item.service';

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

  ngOnInit(): void {
    this.createItem = this.fb.group({
      description   : [],
      image  : [],
      name   : [],
      price : [],
      quantity : []
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
