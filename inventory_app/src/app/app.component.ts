import { Component } from '@angular/core';
import { Product } from "./product/product.model"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  selectedProduct: string;
  products: Product[]

  constructor(){
    this.products=[new Product("Iphone", ["Tecnologia", "Celulares", "Apple"], "..." ),new Product("Pixel", ["Tecnologia", "Celulares", "Google"], "..." )]
  }
  newSelectedProduct(product: Product){
    this.selectedProduct = product.name
  }
  addProduct(product:Product){
    this.products.push(product)
  }
}
