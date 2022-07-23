import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { CreateItemService } from 'src/app/services/create-item.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.css']
})
export class UpdateItemComponent implements OnInit {

  allProducts: Product[] = []
  updateItemForm! : FormGroup

  constructor(    
    private productService: ProductService,
    private fb: FormBuilder,
    private createItemService : CreateItemService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (resp) => this.allProducts = resp,
      (err) => console.log(err),
      () => console.log("Products Retrieved")
    );

    


    this.updateItemForm = this.fb.group({
      searchItemName: [''],
      id: [],
      name : [],
      description   : [],
      image  : [],
      price : [],
      quantity : []
  })

  // this.updateItemForm.controls['currentName']
  //   .valueChanges
  //   .subscribe({
  //     next: name =>{
  //       this.updateItemForm.patchValue({
  //         id: id,
  //         name : name,
  //         description   : description,
  //         image  : [],
  //         price : [],
  //         quantity : []
  //       })
  //     }
  //   })

  this.updateItemForm.controls['searchItemName']
  .valueChanges
  .subscribe({
    next: name =>{
      var strs=name.split(" Item ID: ")
      this.updateItemForm.patchValue({
        name: strs[0],
        id: this.allProducts[1].id
    })
      console.log(strs)
    }
  })

  // this.updateItem.patchValue({name: 'headphones'})


  }

  submitItemUpdate() {

    if (this.updateItemForm.valid) {
      
      let itemModel = ({
        id: this.updateItemForm.value.id,
        name : this.updateItemForm.value.name,
        description   : this.updateItemForm.value.description,
        image  : this.updateItemForm.value.image,
        price : this.updateItemForm.value.price,
        quantity : this.updateItemForm.value.quantity
      })
      console.log(itemModel)      
      this.createItemService.updateItem(itemModel)
      .subscribe({
        next: (response: any) => {
          console.log(response)
        }
      })
      this.router.navigate(['/home']);
  }

}


}
