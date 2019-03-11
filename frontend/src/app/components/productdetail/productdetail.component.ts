import { Component, OnInit } from '@angular/core';
import {Product} from "../../models/product";
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css']
})
export class ProductdetailComponent implements OnInit {

  product: Product;

  constructor(private activatedRouter: ActivatedRoute, private productService: ProductService) {
    this.product = new Product();
  }

  ngOnInit() {
    this.activatedRouter.params.subscribe(params => {
      if (typeof params['id'] !== 'undefined') {
        this.product._id = params['id'];
      } else {
        this.product._id = '';
      }
    });
    this.getSingleProduct(this.product._id);
  }

  getSingleProduct(id: string) {
    this.productService.getSingleProduct(id)
      .subscribe(res =>{
        this.product = res["product"];
      });
    console.log(this.product);
  }

  goBack() {
    localStorage.removeItem('token');
  }
}
