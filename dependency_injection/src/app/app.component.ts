import { Component } from '@angular/core';
import {MyService} from "./my.service"
import{SayMyNameService} from "./say-my-name.service"
import{ReflectiveInjector} from "@angular/core";
import{UserService} from "./user.service"
import {GetInjectorsService} from "./get-injectors.service"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public service:MyService, public sayMyName: SayMyNameService, public injector:GetInjectorsService, public userService: UserService){}
  runLog(){
    this.service.log()
  }
  runName(){
    this.sayMyName.run()
    this.sayMyName = this.injector.getNewName()
  }
  addUser(name: string){
    this.userService.addUser(name)
  }
}
