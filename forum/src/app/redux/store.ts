import { Store, Reducer, createStore, combineReducers, StoreEnhancer} from "redux"
import {UserState, UserReducer} from "./user"
import {MessageReducer, MessageState} from "./messages"
import {OpaqueToken} from "@angular/core"
export interface AppState {
  users: UserState,
  messages: MessageState
}

export const rootReducer : Reducer<AppState> = combineReducers<AppState>({
  users: UserReducer,
  messages: MessageReducer
})
export const  devtools : StoreEnhancer<AppState> = window["devToolsExtension"]?
window["devToolsExtension"]():f=>f;

export let store: Store<AppState> = createStore<AppState>(rootReducer, devtools)

export const AppStore = new OpaqueToken("App.store")
