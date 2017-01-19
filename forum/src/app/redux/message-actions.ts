import {Action} from "redux"
import {Message} from "../models/message-model"

export interface AddMessageAction extends Action {
  message: Message
};
export const ADD_MESSAGE: string = "ADD_MESSAGE";
export function addMessage(message:Message): AddMessageAction{
  return{
    type: ADD_MESSAGE,
    message: message
  }
};
