import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private productService: ProductService, private router: Router) { }

  products: Product[];

  ngOnInit() {
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts()
      .subscribe(res =>{
        this.products = res["products"];
      });
  }

  /**
   *
   * @param id
   */
  confirmDelete(id: string, i: number) {
    if(confirm('El producto se borrará de tu lista de productos...')){
      this.productService.deleteProduct(id)
        .subscribe(
          res =>{
            console.log(res);
            console.log("Se ha borrado correctamente ", i);
            //this.getProducts();
            //Two way data binding!
            this.products.splice(i,1);
            console.log("Se ha borrado correctamente ", this.products);

          },
          err => {
            this.handleError(err);
          });
    }
  }

  /**
   *
   * @param err
   */
  private handleError(err: HttpErrorResponse) {
    if( err.status == 500 ) {
      alert(err);
    }
  }

  goBack() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('');
  }
}
