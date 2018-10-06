import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { ProductService } from '../../services/product/product.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
