import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import {User} from "../models/user-model"
import {Message} from "../models/message-model"
import * as MessageActions from "../redux/message-actions"
import * as UserActions from "../redux/user-actions"
import {AppStore, AppState} from "../redux/store"
import {Store} from "redux"
import {uuid} from "../util/uuid"
@Component({
  selector: 'thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {
  currentUser: User
  messages: Message[]

  constructor(@Inject(AppStore) private state : Store<AppState>){
    this.state.subscribe(()=>this.readState())
    this.readState()
   }
   readState(){
     const state = this.state.getState()
     this.currentUser= state.users.currentUser
     const messageEntities =state.messages.entities
     this.messages = Object.keys(messageEntities).map(key=>messageEntities[key])
   }

   addMessage(input: HTMLInputElement){
     const messageText: string = input.value
     const author: User = this.currentUser
     const date: Date = new Date()
     const newMessage : Message ={
       text: messageText,
       author: author,
       sentAt: date,
       id: uuid()
     }
     this.state.dispatch(MessageActions.addMessage(newMessage))
     input.value=""
   }

  ngOnInit() {
  }

}
