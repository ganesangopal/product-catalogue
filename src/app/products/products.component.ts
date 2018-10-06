import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductService } from '../services/product/product.service';
import { AuthService } from '../shared/auth.service';

@Component({
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: any = [];
  constructor(
    private productService: ProductService, 
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.productService.getAllProducts().subscribe(
      (products) => this.products = products,
      (error) => console.log(error)
    );
  }

  deleteProduct(productData) {
    if (confirm("Are you sure you want to delete product " + productData.productName)) {
      this.productService.deleteProduct(productData._id).subscribe(
        (data) => this.refreshProductsList(),
        (error) => console.log(error)
      );
    }
  }

  refreshProductsList() {
    this.productService.getAllProducts().subscribe(
      (products) => this.products = products,
      (error) => console.log(error)
    );
  }

  isAdmin() {
    return this.authService.hasAdminRole();
  }

}
