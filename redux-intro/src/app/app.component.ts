import { Component, Inject } from '@angular/core';
import {AppStore, AppState} from "./redux/store"
import * as AppActions from "./redux/app-actions"
import{Store} from "redux"
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  counter: Number

  constructor(@Inject(AppStore) private store:Store<AppState>){
    this.store.subscribe(()=>this.readState())
    this.readState()
  }
  readState(){
    let state: AppState = this.store.getState()
    this.counter = state.counter
  }
  increment(){
    this.store.dispatch(AppActions.increment())
  }
  decrement(){
    this.store.dispatch(AppActions.decrement())
  }
}
