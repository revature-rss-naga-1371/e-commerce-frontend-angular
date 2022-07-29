import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Array<any> = []
  cartCount!: number;
  products: {
    product: Product,
    quantity: number
  }[] = [];
  subscription!: Subscription;
  totalPrice: number = 0;
  selectedId!: number;
    Product! : Product;
    productId!: number;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
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
    this.subscription = this.productService.getCart().subscribe(
      (cart) => {
        this.cartCount = cart.cartCount;
        this.products = cart.products;
        this.totalPrice = cart.totalPrice;
      }
    );
    //const productId: any = this.route.snapshot.paramMap.get('id') ;
    this.route.paramMap.subscribe((params: ParamMap) => {

      this.productId = Number (params.get('id'));
    })
    console.log(this.productId)
    this.productService.getSingleProduct(this.productId).subscribe( 
      (resp: Product) => this.Product = resp,
      (err) => console.log(err),
      () => console.log("Product retrieved successfully")
      )
  };
  addToCart(product: Product): void {

    let inCart = false;

    this.products.forEach(
      (element) => {
        if(element.product == product){
          ++element.quantity;
          let cart = {
            cartCount: this.cartCount + 1,
            products: this.products,
            totalPrice: this.totalPrice + product.price
          };
          this.productService.setCart(cart);
          inCart=true;
          return;
        };
      }
    );

    if(inCart == false){
      let newProduct = {
        product: product,
        quantity: 1
      };
      this.products.push(newProduct);
      let cart = {
        cartCount: this.cartCount + 1,
        products: this.products,
        totalPrice: this.totalPrice + product.price
      }
      this.productService.setCart(cart);
    }
      
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
