# Redux y Angular
## Una historia de amor...

Redux y Angular tienen un gran potencial juntos ya que podemos controlar el estado de nuestra aplicacion desde un solo lugar y pasarlo a nuestros compoenentes. Redux con Angular no cambia mucho. Podemos exactamente igual de como lo veniamos usando, pero tambien podemos aprovechar TypeScript y RxJs para aprovecharlo aún mas!


Haremos una aplicación super simple en donde tendremos un contador y un boton para aumentar y disminuir su valor. Para comenzar hagamos el Store:

```javascript

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

```

Lo primero q hacemos es generar un interface del estado de nuestro Store, vemos que tenemos un counter que es un numero. Luego creamos un initialState de tipo AppState.

Vamos a crear el reducer que va a ser el Reducer de nuestro AppState. El reducer va tomar nuestro estado que si no esta definido va tener el initialState y una accion.

Antes de entender lo que sigue vamos a ver nuestras acciones que estamos importando en AppActions.

```javascript
import {Action, ActionCreator} from 'redux';

export const INCREMENT : String = "INCREMENT";
export const DECREMENT : String = 'DECREMENT';
export const INCREMENT_BY : String = 'INCREMENT-BY'
export const DECREMENT_BY : String = 'DECREMENT-BY'

export interface ByAction extends Action {
  by: number
}
```

Vemos que estamos importando las acciones como variables para no cometer typing errors en los nombres de ella, y ademas estamos creando una interfaz para las acciones que van a tener la propiedad by, ya que si no al compilar nos diria que action que es type Action no tiene una propiedad by.

Volviendo a nuestro store creamos las acciones utilizando las variables, y cuando utilizamos la accion con al propiedad by la volvemos a tipifical de esta manera :

```javascript
  (<AppActions.ByAction>action).by
```
 Con el StoreEnhancer le agregamos las devtools de Redux, y finalmente creamos el Store de AppState. Para entender para que usamos la última linea veamos nuestro NgModule.

```javascript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {store, AppStore} from "./redux/store";
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [{provide: AppStore, useValue: store}],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Vemos que proveemos AppStore con el valor de store. Para crear el token AppStore es que utilizamos OpaqueToken.

Ahora veamos como utilizaremos nuestro Store.

```javascript
import { Component, Inject } from '@angular/core';
import {AppStore, AppState} from './redux/store';
import * as AppActions from './redux/actions';
import {Store, Action} from "redux";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  counter: number
  constructor(@Inject(AppStore) private store: Store<AppState>){
    this.store.subscribe(()=>this.readState())
    this.readState()
  }
  readState(){
    const state : AppState = this.store.getState();
    this.counter = state.counter
  }
  increment(input: HTMLInputElement){
    const number: number = Number(input.value)
    if(number){
      this.store.dispatch(AppActions.incrementBy(number))
    }else{
      this.store.dispatch(AppActions.increment())
    }
  }
  decrement(input: HTMLInputElement){
    const number = input.value
    if(number){
      this.store.dispatch(AppActions.decrementBy(number))
    }else{
      this.store.dispatch(AppActions.decrement())
    }
  }

}


```

Vemos que creamos una instancia de AppStore utilizando @Inject. Nuestro store es una observable entonces nos subscribimos a el, y le decimos que corra readState ante cualquier cambio. Ademas queremos que lea el estado cuando carga la página. Ahora vemos que en readState simplemente le asignamos el valor del counter de nuestro state a la variable counter de nuestro componente.

Finalmente tenemos las funciones increment y decrement. Estas utilizan un ActionCreator, volvamos a nuestras acciones y generemoslos.

```javascript
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
```
Ahora simplemente los usamos dependiendo el caso. Vemos que como argumento tenemos un HTMLInputElement asi que solo nos faltaría crear la vista para hacer funcionar a este componente:

```html
<h1>El valor de Counter es: {{counter}}</h1>
<input #number type="text" name="" value="">
<button (click)="increment(number)" type="button" name="button">Increment</button>
<button (click)="decrement(number)" type="button" name="button">Decrement</button>

```
