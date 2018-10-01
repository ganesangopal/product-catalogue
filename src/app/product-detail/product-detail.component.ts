import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  
  id: any;
  product: object;
  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.productService.getProduct(this.id).subscribe(
      (product) => this.product = product,
      (error) => console.log(error)
    );
  }

}
