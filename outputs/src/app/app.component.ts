import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name: string

  constructor(){
    this.name=""
  }

  changeName(name){
    console.log(name)
    this.name=name
  }
}
