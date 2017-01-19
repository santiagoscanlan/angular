import { Injectable } from '@angular/core';

@Injectable()
export class MyService {

  constructor() { }
  log(){
    console.log("Hola Soy el Original")
  }
}
