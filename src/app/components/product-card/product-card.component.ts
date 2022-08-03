import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { CreateItemService } from 'src/app/services/create-item.service';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit{

  isEditing: any;
  cartCount!: number;
  products: {
    product: Product,
    quantity: number
  }[] = [];
  subscription!: Subscription;
  totalPrice: number = 0;
  selectedId!: number;
  regPrice!: number;
  salePrice!: number;
  @Input() productInfo!: Product;
  @Input() something!: any;
  product$! : Observable<Product[]>;
  constructor(
    private productService: ProductService,
    private createItemService : CreateItemService,
    private route: ActivatedRoute
    ) { }
  
  ngOnInit(): void {
    this.subscription = this.productService.getCart().subscribe(
      (cart) => {
        this.cartCount = cart.cartCount;
        this.products = cart.products;
        this.totalPrice = cart.totalPrice;
        if (this.something != null) {
          console.log("is not null");
          this.isEditing = true;
        }
      }
    );
    this.product$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.selectedId = Number(params.get('id'));
        return this.productService.getProducts();
    }));
    if (Number(this.productInfo.price) > 10000) {
      this.regPrice = Number(this.productInfo.price % 10000);
      this.salePrice = Number(this.productInfo.price / 1000000);
    } else {
      this.regPrice = Number(this.productInfo.price);
    }
  }

  addToCart(product: Product): void {

    let inCart = false;

    this.products.forEach(
      (element) => {
        if(element.product == product){
          ++element.quantity;
          var extractedPrice = 0;
          if (product.price > 10000) {
            extractedPrice = (product.price / 1000000);
          } else {
            extractedPrice = (product.price % 10000);
          }
          let cart = {
            cartCount: this.cartCount + 1,
            products: this.products,
            totalPrice: (this.totalPrice + extractedPrice),
          };
          this.productService.setCart(cart);
          console.log(cart.totalPrice);
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
      var extractedPrice = 0;
      if (product.price > 10000) {
        extractedPrice = (product.price / 1000000);
      } else {
        extractedPrice = (product.price % 10000);
      }
      let cart = {
        cartCount: this.cartCount + 1,
        products: this.products,
        totalPrice: (this.totalPrice + extractedPrice),
      }
      this.productService.setCart(cart);
      console.log(cart.totalPrice);
    }
      
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  submitItemUpdate() {
    console.log(this.productInfo.name);
    console.log("id: " + this.productInfo.id)
      var priceString = this.productInfo.price.toString();
      if (Number(priceString) > 10000) {
        priceString = String(Number(priceString)%10000);
      }
      var temp = Number((<HTMLInputElement>document.getElementById(String(this.productInfo.id))).value)
      console.log(temp);
      if ((Number(priceString) < temp+0.1) && (Number(priceString) > temp-0.1)) {
        temp = 0;
      }
      let itemModel = ({
        id: this.productInfo.id,
        name : this.productInfo.name,
        description   : this.productInfo.description,
        image  : this.productInfo.image,
        price : String(Number(priceString) + (temp*1000000)),
        quantity : this.productInfo.quantity
      })
      // console.log(itemModel.price)
      this.createItemService.updateItem(itemModel)
      .subscribe({
        next: (response: any) => {
          // console.log(response)
        }
      })
  }

  removeSaleFlag() {

  }

}
