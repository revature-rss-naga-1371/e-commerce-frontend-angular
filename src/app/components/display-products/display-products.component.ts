import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display-products',
  templateUrl: './display-products.component.html',
  styleUrls: ['./display-products.component.css']
})
export class DisplayProductsComponent implements OnInit {

  allProducts: Product[] = [];
  isEditing: any;
  navigationSubscription: any;

  constructor(private productService: ProductService, private router: Router) { 
    this.isEditing = this.router.getCurrentNavigation()!.extras.state;
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }

  ngOnInit(): void {
    this.isEditing = !this.isEditing;
    if (this.isEditing == true) {
      this.productService.getProducts().subscribe(
        (resp) => this.allProducts = resp,
        (err) => console.log(err),
        () => console.log("Sales View Loaded")
      );
    } else {
      this.productService.getProducts().subscribe(
        (resp) => this.allProducts = resp,
        (err) => console.log(err),
        () => console.log("Products Retrieved")
      );
    }
    
  }

}
