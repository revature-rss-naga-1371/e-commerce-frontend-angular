import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  cartCount!: number;
  subscription!: Subscription;

  isDark = false

  constructor(private authService: AuthService, private router: Router, private productService: ProductService) { }
  
  ngOnInit(): void {
    this.subscription = this.productService.getCart().subscribe(
      (cart) => this.cartCount = cart.cartCount
    );
    this.isDark = this.authService.isDark
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
    let cart = {
      cartCount: 0,
      products: [],
      totalPrice: 0.00
    };
    this.productService.setCart(cart);
    this.router.navigate(['login']);
  }

  resetPassword() {
    this.router.navigate(['reset_password'])
  }

  createItem() {
    console.log("create")
    this.router.navigate(['create_item'])
  }

  updateItem() {
    this.router.navigate(['update_item'])
  }

  salesView() {
    this.router.navigate(['update_item']);
    this.router.navigate(['home'], {state: {isEditing: "true"}});
  }

}
