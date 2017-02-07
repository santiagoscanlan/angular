import {Action, ActionCreator} from 'redux';

export const INCREMENT : String = "INCREMENT";
export const DECREMENT : String = 'DECREMENT';
export const INCREMENT_BY : String = 'INCREMENT-BY'
export const DECREMENT_BY : String = 'DECREMENT-BY'

export interface ByAction extends Action {
  by: number
}

export const increment: ActionCreator<Action> = () => {
  return {type: INCREMENT}
}

export const decrement : ActionCreator<Action> = () => {
  return {type: DECREMENT}
}

export const decrementBy : ActionCreator<ByAction> = (n : number) => {
  return {
    type: DECREMENT_BY,
    by: n,
  };
}

export const incrementBy : ActionCreator<ByAction> = (n : number) => {
  return {
    type: INCREMENT_BY,
    by: n,
  };
}
