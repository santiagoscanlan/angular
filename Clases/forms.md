# Angular Form

##FormControls y Form Groups

###FormControls
Un formControl significa un input. Es la unidad mas pequeña en un formulario en Angular.

```javascript
let nameControl = new FormControl("Guille")

let name = nameControl.value // -> Guille
```

Para crearlo desde el HTML haríamos:

```html
<input type="text" [formControl]="name">
```

Veremos adelante un poco mas de como funciona esto.


### FormGroup

FormGroup será el encapsulador de todos los FormControls que formen el formulario.
```javascript
let personInfo = new FormGroup({
  firstName: new FormControl("Guille"),
  lastName: new FormControl("Aszyn"),
  city: new FormControl("Buenos Aires")
  })

  personInfo.value // -> {
//   firstName: "Guille",
//   lastName: "Aszyn",
//   city: "Buenos Aires"
// }

```

Hagamos un formulario simple donde solo preguntemos el nombre


Iniciemos un nuevo proyecto de angular y creemos un nuevo componenente para un form.

En el template pongamos

```html
<form #form="ngForm" (ngSubmit)="onSubmit(form.value)">
  <input type="text" name="name" value="" placeholder="name" ngModel>
   <input type="submit">
 </form>
```

Creamos la variable form usando # y le asignamos el FormGroup usando ngForm. Ahora a ese grupo le agregamos FormControls usando NgModel en el input. El valor del atributo name del input le da el nombre del key del objeto.

(ngSubmit) es un evento nativo de angular que sería cuando se sumbmitea el formulario, y este esta ejecutando la funcion onSubmit y pasando el value de la variable formulario que creamos arriba. Podemos crear esta funcion en nuestra clase.
Por ahora solo hagamos que loguié el objeto en la consola.

```javascript

  onSubmit(formObj):void{
console.log("The value of of form is:", formObj)
}
```


## Form Builder

Otra forma de crear formularios es usando FormBuilder pero para eso vamos a necesitar agregar un modulo a nuestro app.module.ts:

```javascript
mport { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <--AGREGAMOS ESTO
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DemoFormComponent } from './demo-form/demo-form.component';

@NgModule({
  declarations: [
    AppComponent,
    DemoFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule // <--AGREGAMOS ESTO
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Si ves hay otro modulo de formularios que ya estaba, FormsModule, nos permitio usar ngForm antes.

Ahora ngBuilder nos va a permitir crear el objeto del formulario desde nuestra clase, lo cual nos va a resultar mas útil más adelante.

```javascript
export class DemoFormComponent implements OnInit {

  myForm:FormGroup;

  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      name:["Guille"]
    })
   }

  onSubmit(formObj):void{
console.log("The value of of form is:", formObj)
  }
  ngOnInit() {
  }

}
```
Como vemos el método .group() del formBuilder nos permitió crear un FormGroup y como argumento le pasamos un objeto con los form controls.

Ahora en nuestra view deberiamos poner esto:

```html
<form [formGroup]="myForm" (ngSubmit)="onSubmit(myForm.value)">
  <input type="text" placeholder="name" [formControl]="myForm.controls.name">
  <input type="submit">
</form>
```

Como vemos le asigno a [formGroup] la variable myForm que cree en mi clase y al input le asigno el [formControl] que lo uso accediendo a los .controls de myForm. También tuve que refactorear el argumento de onSumbit para que use el value de myForm.


Entonces vemos que para crear un nuevo formulario hay dos caminos. Si queremos crear un nuevo FormGroup con nuevos FormControl usamos:
- ngForm y
- NgModel

Para vincular un form con un FormGroup ya existente usamos
- formGroup y
- formControl

## Validators

Los validadores nos van a permitir chequear que los usuarios ingresen la data en el formato que nosotros queremos.

Para usar los validadores tenemos que usar el modulo  *Validators*.

El validador mas comun es required.

```javascript
  constructor(fb: FormBuilder){
    this.myForm = fb.group({
      "name": ["", Validators.required]
    })
  }
```

Para utilizar los validadores vamos a usar dos propiedades: .valid y .hasError


```html
<div *ngIf="!myForm.valid">El formulario no es valido</div>

<div *ngIf="!myForm.controls.name.valid">El nombre no es valido</div>
```

hasError va ser más util cuando queremos especificar un error de un validador especifico y no solamente si es valido o no. Por ejemplo si agrgasemos una contraseña que tiene q tener un maximo de 16 caracteres y un minimo de 8.


```javascript
  constructor(fb: FormBuilder){
    this.myForm = fb.group({
      "name": ["", Validators.required],
      "password": ["", Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(16)
          ])]
    })
  }
```
Para añadir varios validadores usamos *Validators.compose()* y le pasamos un arreglo de validadores. Ahora veamos la vista.

```html
<div
 *ngIf="!myForm.controls.password.valid && myForm.controls.password.touched">La contraseña no es válida <span
   *ngIf="myForm.hasError('!minLength', 'password') || myForm.hasError('!maxLength', 'password')">La password debe estar entre los 8 y 16 carácteres.</span></div>
```

### Crear Validadores

Como vimos hay built-in Validators, que son los tres anteriores, y pattern en el cual tenemos que usar un RegEx.

Si quisieramos crear un validador propio tendríamos que crearlo a partir de una función fijemonos como funciona esto.

Añademos un username que tenga que si o si tener un numero.

Primero creemos un nuevo formControl para un username.

```javascript
  constructor(fb: FormBuilder){
    this.myForm = fb.group({
      name: ["", Validators.required],
      password: ["", Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(16)
          ])],
      username: ["", Validators.compose([
        Validators.required, hasNumber
      ])]

    })
  }
```

Ahora creemos la funcion del validador hasNumber. Un validador tiene que devolver un objeto con el nombre del error como key y el valor booleano true como propiedad si el input no es valido, si es valido no devuelve nada. Veamos como seria nuestra función.


```javascript

function hasNumber(control: FormControl): {[s:string]: boolean}{
if( !control.value.split("").some((l)=> Number(l))){
  return {noNumber:true}
}
}

```


Ahora simplemente usamos el nombre del error en la vista

```html
<div
 *ngIf="myForm.controls.username.hasError('noNumber')">El usuario debe tener numeros
</div>
```


Otra cosa que podriamos hacer con los validadores es cambiar el background del input por ejemplo:

```html
<input
 [class.error]="!myForm.controls.username.valid && myForm.controls.username.touched"
    type="text" name="username" [formControl]="myForm.controls.username">
```


## Observando cambios

Hasta ahora solo podíamos ver cambios en formulario, cuando se ejecutaba onSubmit, pero tambien hay un evento q nos va a permitir observar los cambios en tiempo real, *valueChanges*.


```javascript
this.myForm.controls.name.valueChanges.subscribe(
  (value: string) =>{
    console.log("name cambio a", value)
  }
  )

this.myForm.valueChanges.subscribe(
  (form: any)=>{
    console.log("form cambio a", form)
  }
  )

  ```

## Enlace de Datos Bidireccionales
### Two way data binding

Hasta ahora habiamos visto que los datos viajen en una sola dirección. Angular 2 esta echo para generalmente tener la data yendo en una dirección.(Angular 1 se basaba principalmente en datos bidireccionales, con Angular 2 cambia el paradigma). Pero con formularios quizas querramos utilizar en ciertos casos especificos un enlace bidireccional. Para eso utilizaremos ngModel.


```javascript
export class DemoFormComponent implements OnInit {

  myForm:FormGroup;
  name: string

  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      name:["Guille"]
    })
   }

  onSubmit(formObj):void{
console.log("The value of of form is:", formObj)
  }
  ngOnInit() {
  }

}
```


Solamente agregamos una nueva instancia name. Ahora utilizaremos ngModel en nuestro input tag

```html

  <input type="text" [form control]="myForm.controls.name" [(ngModel)]="name">

  <div>
    El nombre es {{name}}
  </div>

  ```

  Utilizamos output() e input[] en ngModel para indicar que es un enlace de dos direcciones. Luego en el div mostramos en el view el valor de name.
