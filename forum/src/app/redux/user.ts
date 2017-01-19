import {Store, createStore, Action, Reducer} from "redux";
import {User} from "../models/user-model"
import {ADD_USER, addUserAction, CHANGE_CURRENT_USER, changeCurrentUserAction} from "./user-actions"
export interface UserEntities {
  [id: string]: User
}
export interface UserState {
  entities: UserEntities;
  currentUser: User;
}

const initialState : UserState = {
  entities: {},
  currentUser: null
}


export const UserReducer : Reducer<UserState> = function(state: UserState=initialState, action: Action): UserState{
  switch(action.type){
    case ADD_USER:
      const newUser:User = (<addUserAction>action).user
      const newUsers = Object.assign({}, state.entities, {[newUser.id]: newUser})
      return Object.assign({}, state, {entities:newUsers})
    case CHANGE_CURRENT_USER:
      const newCurrentUser:User = (<changeCurrentUserAction>action).user
      return Object.assign({}, state, {currentUser: newCurrentUser})
    default:
      return state
  }
}
