import {User} from "./user-model"

export interface Message {
  text: string;
  author: User;
  sentAt: Date
  id: string
}
