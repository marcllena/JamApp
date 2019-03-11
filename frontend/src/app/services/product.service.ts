import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from "../models/product";
import { Environment } from "./environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  environment: Environment;
  selectedProduct: Product;
  products: Product[];

  constructor(private http: HttpClient) {
    this.selectedProduct = new Product();
    this.environment = new Environment();
  }

  getProducts() {
    return this.http.get(this.environment.urlProduct);
  }

  getSingleProduct(_id: string) {
    return this.http.get(this.environment.urlProduct + `/${_id}`);
  }

  postProduct(product: Product) {
    return this.http.post(this.environment.urlProduct, product);
  }

  putProduct(product: Product) {
    return this.http.put(this.environment.urlProduct + `/${product._id}`, product);
  }

  deleteProduct(_id: string) {
    return this.http.delete(this.environment.urlProduct + `/${_id}`);
  }
}
