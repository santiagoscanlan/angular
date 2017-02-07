import {Store, Action, Reducer, createStore, StoreEnhancer} from "redux";
import * as AppActions from './actions';
import {OpaqueToken} from '@angular/core'
export interface AppState {
  counter: number
}

const initialState : AppState  = {
  counter: 0
}

const reducer : Reducer<AppState> = (state: AppState = initialState, action:Action) => {
  switch(action.type){
    case AppActions.INCREMENT:
      return Object.assign({}, state, {counter: state.counter+1 });
    case AppActions.DECREMENT:
      return Object.assign({}, state, {counter: state.counter-1});
    case AppActions.DECREMENT_BY:
      const decrementBy : number = (<AppActions.ByAction>action).by
      return Object.assign({}, state, {counter: state.counter-decrementBy})
    case AppActions.INCREMENT_BY:
      const incrementBy : number = (<AppActions.ByAction>action).by
      return Object.assign({}, state, {counter: state.counter+incrementBy})
    default:
      return state
  }
}

const  devtools : StoreEnhancer<AppState> = window["devToolsExtension"]?
window["devToolsExtension"]():f=>f;


export let store: Store<AppState> = createStore<AppState>(reducer, devtools);

export const AppStore = new OpaqueToken('App.store');
