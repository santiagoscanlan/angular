import { Injectable } from '@angular/core';

@Injectable()
export class MockMyService {

  constructor() { }
  log(){
    console.log("Hola Soy el Trucho")
  }
}
