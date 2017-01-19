import { Component, OnInit, EventEmitter } from '@angular/core';
import{ Product} from "../product/product.model"

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  outputs: ["newProduct"]
})
export class FormComponent implements OnInit {
  newProduct: EventEmitter<Product>
  constructor() {
    this.newProduct = new EventEmitter()
  }

  submit(name, department, img){
    var departmentArr: string[] = department.value.split(", ")
    var product: Product = new Product(name.value, departmentArr, img.value)
    this.newProduct.emit(product)
    name.value=""
    department.value=""
    img.value=""

  }

  ngOnInit() {
  }

}
