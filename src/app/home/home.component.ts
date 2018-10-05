import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: any = [];
  constructor(private authService: AuthService, private productService: ProductService) { }

  ngOnInit() {
    //console.log(localStorage.getItem('token'));
  }

  onLogout() {
    console.log('logout method');
    //this.authService.onLogout();
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe(
      (products) => this.products = products,
      (error) => console.log(error)
    );
  }

  getUserInfo() {
    this.authService.getCurrentUser();
  }

}
