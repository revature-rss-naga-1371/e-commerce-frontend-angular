import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products: {
    product: Product,
    quantity: number
  }[] = [];
  totalPrice!: number;
  cartProducts: Product[] = [];

  isEmpty = true

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.productService.getCart().subscribe(
      (cart) => {
        this.products = cart.products;
        this.products.forEach(
          (element) => this.cartProducts.push(element.product)
        );
        this.totalPrice = cart.totalPrice;
        this.totalPrice > 0 ? this.isEmpty = false : this.isEmpty = true
      }
    );
  }

  emptyCart(): void {
    let cart = {
      cartCount: 0,
      products: [],
      totalPrice: 0.00
    };
    this.productService.setCart(cart);
    this.isEmpty = true
    this.router.navigate(['/home']);
  }

  deleteFromCart(id: number): void {
    console.log(id)
    let price = 0
    this.products = this.products.filter((element, index) => index !== id)
    this.products.forEach(
      (el) => price += el.quantity*el.product.price
    )
    let cart = {
      cartCount: this.products.length,
      products: [] = this.products,
      totalPrice: price
    }
    console.log("new cart is " + cart)
    this.productService.setCart(cart)
  }

  changeQuantity(id: number, change: number) {

    for (var i = 0; i < this.products.length; i++) {

      if (this.products[i] == this.products[id]) {
        if (change === 1) {

          this.products[i].quantity++;
        }
        else {
          if (this.products[i].quantity !== 0) {
            this.products[i].quantity--;
          }
        }
      }
      let count = 0
      this.products.forEach(
        (el) => count += el.quantity
      )
      let price = 0
      this.products.forEach(
        (el) => price += el.quantity*el.product.price
      )
      let cart = {
        cartCount: count,
        products: [] = this.products,
        totalPrice: price
      }
      console.log("new cart is " + cart)
      this.productService.setCart(cart)
    }
  }
  

}
