import {Action, Reducer} from "redux"
import {Message} from "../models/message-model"
import {ADD_MESSAGE, AddMessageAction} from "./message-actions"

export interface MessageEntities{
  [id: string]: Message
}
export interface MessageState {
  entities: MessageEntities
}

const initialState : MessageState ={
  entities: {}
}

export function MessageReducer(state : MessageState = initialState, action: Action){
  switch(action.type){
    case ADD_MESSAGE:
      const message : Message = (<AddMessageAction>action).message
      const newEntities: MessageEntities = Object.assign({}, state.entities, {[message.id]: message} )
      return Object.assign({}, state, {entities: newEntities})
    default:
      return state
  }
}
