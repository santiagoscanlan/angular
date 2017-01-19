import { Component, OnInit, EventEmitter } from '@angular/core';
import { Product } from "../product/product.model";

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  inputs: ["products"],
  outputs: ["productSelected"]
})
export class ProductListComponent implements OnInit {
  products: Product[];
  productSelected: EventEmitter<Product>;
  currentProduct: Product;


  constructor() {
    this.productSelected = new EventEmitter()
   }

   clicked(product: Product){
     this.productSelected.emit(product)
     this.currentProduct=product
   }

  ngOnInit() {
  }

}
