import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  
  id: any;
  routeParamSubscription: any;
  product: object;
  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit() {
    //this.id = this.route.snapshot.params['id'];
    this.routeParamSubscription = this.route.paramMap.subscribe(params => {
      console.log(params.get('id'));
      this.id = params.get('id');
      this.productService.getProduct(this.id).subscribe(
        (product) => this.product = product,
        (error) => console.log(error)
      );
    });
  }

  ngOnDestroy() {
    this.routeParamSubscription.unsubscribe();
  }

}
