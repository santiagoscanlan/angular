import { Injectable, ReflectiveInjector } from '@angular/core';
import{UserService} from "./user.service"
import{SayMyNameService} from "./say-my-name.service"


@Injectable()
export class GetInjectorsService {

  constructor(public userService: UserService) { }
  getNewName(){
    var injector = ReflectiveInjector.resolveAndCreate([
    {provide: SayMyNameService, useFactory: ()=>{return new SayMyNameService(this.userService.getRandomUser())}}])
    return injector.get(SayMyNameService)
  }
}
