import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Array<any> = []

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    var id = this.route.snapshot.params['id']
    this.productService.getSingleProduct(id)
    .subscribe({
      next: (response: any) => {
        this.product.push(response)
        // this.product = response
      }
    })
    console.log(this.product)
  }

}
