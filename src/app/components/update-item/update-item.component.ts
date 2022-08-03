import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      name : ['', Validators.required],
      description   : [],
      image  : ['', Validators.required],
      price : ['', [Validators.required, Validators.pattern(/^\d*(\.\d{2})$/)]],
      quantity : ['', [Validators.required, Validators.min(0)]]
  })

  
  this.updateItemForm.controls['searchItemName']
  .valueChanges
  .subscribe({
    next: name =>{
      var strs=name.split(" Item ID: ")
      console.log(strs)
      this.updateItemForm.patchValue({
        name: strs[0],
        id: this.allProducts[strs[1]].id,
        description: this.allProducts[strs[1]].description,
        image: this.allProducts[strs[1]].image,
        price: this.allProducts[strs[1]].price.toFixed(2),
        quantity: this.allProducts[strs[1]].quantity,
    })
      console.log(strs)
    }
  })

  

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
