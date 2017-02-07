import { Component, Inject } from '@angular/core';
import {AppStore, AppState} from './redux/store';
import * as AppActions from './redux/actions';
import {Store, Action} from "redux";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  counter: number
  constructor(@Inject(AppStore) private store: Store<AppState>){
    this.store.subscribe(()=>this.readState())
    this.readState()
  }
  readState(){
    const state : AppState = this.store.getState();
    this.counter = state.counter
  }
  increment(input: HTMLInputElement){
    const number: number = Number(input.value)
    if(number){
      this.store.dispatch(AppActions.incrementBy(number))
    }else{
      this.store.dispatch(AppActions.increment())
    }
  }
  decrement(input: HTMLInputElement){
    const number = input.value
    if(number){
      this.store.dispatch(AppActions.decrementBy(number))
    }else{
      this.store.dispatch(AppActions.decrement())
    }
  }

}
