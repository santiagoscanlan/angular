import {Store, createStore, Reducer, Action, StoreEnhancer} from "redux"

import * as AppActions from "./app-actions"
import {OpaqueToken} from "@angular/core"

export interface AppState {
  counter: number
}

const initialState: AppState = {counter: 0}

const reducer : Reducer<AppState> =   (state:AppState = initialState, action:Action)=>{
  switch (action.type){
    case AppActions.INCREMENT:
      return  Object.assign({}, state, {counter: state.counter+1});
    case AppActions.DECREMENT:
      return  Object.assign({}, state, {counter: state.counter-1});
    default:
      return state
  }
}
let devtools: StoreEnhancer<AppState> =
window['devToolsExtension'] ?
window['devToolsExtension']() : f => f;


export let store : Store<AppState> = createStore<AppState>(reducer, devtools)

export const AppStore = new OpaqueToken("App.store")
