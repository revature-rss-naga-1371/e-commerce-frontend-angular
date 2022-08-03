import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ReviewService } from 'src/app/services/review.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  
  products: {
    product: Product,
    quantity: number
  }[] = [];
  cartCount!: number;
  product: Array<any> = []
  cartProducts: any;
  Product! : Product;
  totalPrice!: number;
  isEmpty= true;
  starRating: number = 0
  subscription!: Subscription;
  // num: number = 0;
  @Input() productId!: number;


  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    
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
      }
    })
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
}
