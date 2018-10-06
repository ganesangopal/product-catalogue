import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: any = [];
  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get('/routes/products');
  }

  getProduct(id) {
    return this.http.get('/routes/products/' + id);
  }

  setProducts(products) {
    this.products = products;
  }

  createProduct(productData) {
    console.log('product', productData);
    return this.http.post('/routes/products', productData);
  }

  updateProduct(id, productData) {
    return this.http.put('/routes/products/' + id, productData);
  }

  deleteProduct(id) {
    return this.http.delete('/routes/products/' + id);
  }
}
