import {Action} from "redux"
import {User} from "../models/user-model"

export const ADD_USER = "ADD_USER"
export interface addUserAction extends Action {
  user: User
}
export function addUser(user: User): addUserAction{
  return {
    type: ADD_USER,
    user: user
  }
}
export const CHANGE_CURRENT_USER ="CHANGE_CURRENT_USER"
export interface changeCurrentUserAction extends Action {
  user:User
}
export function changeCurrentUser(user: User):changeCurrentUserAction{
  return {
    type: CHANGE_CURRENT_USER,
    user: user
  }
}
