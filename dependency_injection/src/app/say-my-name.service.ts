import { Injectable } from '@angular/core';

@Injectable()
export class SayMyNameService {
name: String
  constructor(name:String) {
  this.name=name
  }
  run(){
    console.log(this.name)
    
  }

}
