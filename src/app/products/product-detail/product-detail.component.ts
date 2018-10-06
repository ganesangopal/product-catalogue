import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { ProductService } from '../../services/product/product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  
  id: any;
  routeParamSubscription: any;
  product: object;
  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit() {
    
    this.route.params
      .pipe(
        switchMap(param => {
          this.id = param.id;
          return this.productService.getProduct(this.id);
        })
      )
      .subscribe(product => this.product = product);
  }

  // ngOnDestroy() {
  //   this.routeParamSubscription.unsubscribe();
  // }

}
