import {Action, ActionCreator} from "redux"

export const INCREMENT: String = "increment"
export const increment:ActionCreator<Action>= ()=>({type: INCREMENT})

export const DECREMENT : String = "decrement"
export const decrement: ActionCreator<Action> = ()=>({type:DECREMENT})
