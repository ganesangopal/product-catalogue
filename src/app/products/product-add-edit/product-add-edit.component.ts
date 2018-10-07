import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { ProductService } from '../../services/product/product.service';
import { CanComponentDeactivate } from '../../auth-guard.service';
import { switchMap, catchError } from 'rxjs/operators';

@Component({
  templateUrl: './product-add-edit.component.html',
  styleUrls: ['./product-add-edit.component.css']
})
export class ProductAddEditComponent implements OnInit, CanComponentDeactivate {

  isEditMode: boolean;
  productForm: FormGroup;
  submitted: boolean = false;
  productId: String;
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.isEditMode = this.route.snapshot.data.isEditMode;
    this.productId = this.route.snapshot.params.id;
    console.log(this.isEditMode);
    this.productForm = this.formBuilder.group({
      //_id: [],
      //instock: [],
      productName: ['', Validators.required],
      productsku: ['', Validators.required],
      price: ['', Validators.required]
    });
    if (this.isEditMode) {
      this.productService.getProduct(this.route.snapshot.params.id).subscribe(
        (data) => this.productForm.setValue({
          productName: data['productName'],
          productsku: data['productsku'],
          price: data['price']
        }),
        (error) => console.log(error)
      );
    }
  }

  onCancel() {
    if (this.productForm.touched && this.productForm.dirty) {
      if (confirm('Are you sure you want to leave this page? Your changes will not be saved.')) {
        this.router.navigate(['/products']);
      }
    } else {
      this.router.navigate(['/products']);
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.productForm.valid) {
      if (!this.isEditMode) {
        this.productService.createProduct(this.productForm.value)
          .pipe(
            switchMap((data) => {
              console.log('successfully created product', data);
              return this.productService.getProduct(data['_id']);
            }),
            catchError((e) => {
              return Observable.throw(e);
            })
          )
          .subscribe(
            (product) => {
              var products = this.productService.products;
              products.push(product);
            },
            (error) => console.log(error),
            () => this.router.navigate(['/products'])
          );
      } else {
        this.productService.updateProduct(this.productId, this.productForm.value)
          .pipe(
            switchMap((data) => {
              console.log('successfully updated product', data);
              return this.productService.getProduct(data['_id']);
            }),
            catchError((e) => {
              return Observable.throw(e);
            })
          )
          .subscribe(
            (product) => {
              var products = this.productService.products;
              var productIndex = products.findIndex(obj => obj['_id'] === product['_id']);
              products[productIndex] = product;
            },
            (error) => console.log(error),
            () => this.router.navigate(['/products'])
          );
      }
    }
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (!this.productForm.valid && this.productForm.touched && this.productForm.dirty) {
		  return confirm('Are you sure you want to leave?');
	  }
	  return true;
  }

}