import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ConfirmationDialog } from '../confirmation-dialog';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
//import { MatDialogRef, MatDialog } from '@angular/material';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: any = [];
 // dialogRef: MatDialogRef<ConfirmationDialog>;
  constructor(
    private productService: ProductService, 
    private router: Router,
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

  // openConfirmationDialog() {
  //   this.dialogRef = this.dialog.open(ConfirmationDialog, {
  //     disableClose: false
  //   });
  //   this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete?"

  //   this.dialogRef.afterClosed().subscribe(result => {
  //     if(result) {
  //       console.log(result);
  //       // this.productService.deleteProduct(productData._id).subscribe(
  //       //   (data) => console.log('Deleted successfully ' + productData.productName),
  //       //   (error) => console.log(error)
  //       // );
  //     }
  //     this.dialogRef = null;
  //   });
  // }

}
