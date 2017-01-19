import { Component, OnInit } from '@angular/core';
import { Product } from "./product.model"

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  inputs:["product"]
})
export class ProductComponent implements OnInit {
  product: Product
  constructor() { }

  ngOnInit() {
  }

}
