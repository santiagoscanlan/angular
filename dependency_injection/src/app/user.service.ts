import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
Users: String[];
  constructor() {
    this.Users =["Toni", "Santi", "Guille"]
  }
  getRandomUser(){
    return this.Users[Math.floor(Math.random()*(this.Users.length))]
  }
  addUser(newUser:String){
    this.Users.push(newUser)
    console.log(this.Users)
  }
}
