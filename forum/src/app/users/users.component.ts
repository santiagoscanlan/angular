import { Component, OnInit, Inject, ElementRef} from '@angular/core';
import {AppStore, AppState} from "../redux/store"
import {User} from "../models/user-model"
import {Store} from "redux"
import * as UserActions from "../redux/user-actions"
import {uuid} from "../util/uuid"

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
users: User[]
currentUser: User
  constructor(@Inject(AppStore)private state: Store<AppState>, public el : ElementRef) {
    this.state.subscribe(()=>this.readState())
    this.readState()
  }
  readState(){
  const state = this.state.getState()
  this.users= Object.keys(state.users.entities).map(userId=>state.users.entities[userId])
  this.currentUser = state.users.currentUser
  }
  submitUser(){
    const input: HTMLInputElement = this.el.nativeElement.querySelector("input")
    this.state.dispatch(UserActions.addUser({name: input.value, id: uuid()}))
    input.value=""
  }
  changeCurrentUser(user){
    this.state.dispatch(UserActions.changeCurrentUser(user))
  }
  ngOnInit() {
  }

}
