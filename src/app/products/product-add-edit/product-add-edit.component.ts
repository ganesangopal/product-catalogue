import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { ProductService } from '../../services/product/product.service';
import { CanComponentDeactivate } from '../../auth-guard.service';
import { switchMap, catchError } from 'rxjs/operators';
import { UploadService } from '../../services/uploads/upload.service';

@Component({
  templateUrl: './product-add-edit.component.html',
  styleUrls: ['./product-add-edit.component.css']
})
export class ProductAddEditComponent implements OnInit, CanComponentDeactivate {

  isEditMode: boolean;
  productForm: FormGroup;
  submitted: boolean = false;
  productId: String;
  uploadedFile: any = [];
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private productService: ProductService,
    private cd: ChangeDetectorRef,
    private uploadService: UploadService
  ) { }

  ngOnInit() {
    this.isEditMode = this.route.snapshot.data.isEditMode;
    this.productId = this.route.snapshot.params.id;
    console.log(this.isEditMode);
    this.productForm = this.formBuilder.group({
      //_id: [],
      //instock: [],
      productName: ['', Validators.required],
      productsku: ['', [Validators.required, this.validateProductSku.bind(this)]],
      price: ['', Validators.required],
      productImage: ['', Validators.required]
    });
    if (this.isEditMode) {
      this.productService.getProduct(this.route.snapshot.params.id).subscribe(
        (data) => this.productForm.setValue({
          productName: data['productName'],
          productsku: data['productsku'],
          price: data['price'],
          productImage: ''
        }),
        (error) => console.log(error)
      );
    }
  }

  validateProductSku(control: FormControl): {[key: string]: any} {
    if (control.value) {
      var productsku = this.productService.products.find((product) => 
        product.productsku === control.value && product._id !== this.productId);
      if (productsku) {
        return {productExists: true}
      }
    }
    return null;
  }

  onProductImageUpload(event) {
    let reader = new FileReader();
 
    if(event.target.files && event.target.files.length) {
      this.uploadedFile = event.target.files[0];
      //const [file] = event.target.files;
      //console.log('file input old', file);
      console.log('file input', this.uploadedFile);
      reader.readAsDataURL(this.uploadedFile);
    
      reader.onload = (e) => {
        // this.productForm.patchValue({
        //   productImage: 'imagenewfile.jpg'
        // });
        var image = new Image();
        // Set the Base64 string return from FileReader as source.
        image.src = e.target['result'];
        console.log('image source', image.src);
        image.onload = (event) => {
          console.log('event log', event);
            
          this.upload('image');
        };
        //this.upload('file');
          // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
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
              console.log('product error', e);
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

  upload(type) {
    this.uploadService.uploadImage(this.uploadedFile).subscribe(
      (data) => console.log('data uploaded', data),
      (error) => console.log('error data', error)
    );
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (!this.productForm.valid && this.productForm.touched && this.productForm.dirty) {
		  return confirm('Are you sure you want to leave?');
	  }
	  return true;
  }

}
