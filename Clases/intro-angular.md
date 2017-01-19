# Angular

## Componenetes

HTML entiende una cantidad limitada de built-in tags, como  &lt;select&gt;, &lt;form&gt;, &lt;video&gt; que tienen una funcionalidad definida por el browser.

¿Qué pasaría si le quisieramos enseñar al browser nuevos tags? Por ejemplo, &lt;weather&gt; que muestre el clima, o &lt;login&gt; que muestre un panel para iniciar sesión.

Ese es el fundamento principal de los componentes: Le enseñaremos al browser nuevos tags que tienen funcionalidad personalizada.

Para generar un nuevo componenete usaremos angular-cli, y lo aremos corriendo el comando **genereate**.

Generemos el componente **hello-world**

```ng generate component hello-world```
Un componente tiene dos partes
  1. Una anotación de componente
  2. Una definicion de clase del componente

  Abramos y analicemos hello-world.component.ts.

Enfoquemonos en esto:
  ```javascript
@Component({
  selector: 'app-hello-world'
  // ...etc.
  })
```
Aquí lo que estamos deifiniendo es un nuevo tag HTML <app-hello-world>

La propiedad template muestra de donde se cargará el template de nuestra página. Abre el archivo hello-world.compontent.html para ver que contiene.

Podemos vincularlo a un template o escribirlo directamente en nuestro typescript:
```javascript
@Component({
  selector:"app-hello-world",
  template:`
    <p>
      hello-world work!
    </p>
  `
})
```

En *styleUrls* definimos las hojas de estilo que le queremos aplicar a nuestro template. Es un arreglo porque podemos aplicar varias hojas de estilo.

### Cargando Nuestro componente

Para colocar nuestro componente se lo tenemos que aplicar a un template que ya este siendo renderizado. Abramos el archivo app.component.html, y agreguemos el tag <app-hello-world></app-hello-world>.
Guarda y refreshiá la página y fijate si funcionó.

## Agregando datos a nuestro componente

Hasta ahora nuestro componente es bastante aburrido y estatico, agreguemosle un nuevo componente *user-item*

Primero lo agregamos a nuestro template para ver si funciona.

Ahora vayamos a nuestro archivo .ts y agregamos
```javascript
export class UserItemComponent implements OnInit {
  name: string;

  constructor() {
  this.name = "Felipe"
 }

  ngOnInit() {
  }

}
```
En la class de UserItemComponent cuando ponemos **name: string;** significa que *name* es el atributo que queremos crear y *string* es el tipo

El constructor es una función que es llamada cada vez que creamos nuevas instancias de esta clase.

En nuestro contructor asignamos nuestra propiedad name usando this.name.

Lo que estamos diciendo es que cada ves q un nuevo UserItemComponent es creado setie la propiedad name a "Felipe"

Ahora solamente para agregar esto a nuestra app vamos a user-item.component.html y agregamos:

```html
  <p>
    Hello {{name}}
  </p>
```


## Utilizando Arreglos

Logramos poner un nombre, pero que pasaría si quisiera utilizar un arreglo de usuarios y saludar a todos ellos.

Creemos un nuevo componente user-list y en su typescript hagamos
 ```javascript
 export class UserListComponent implements OnInit {
   names: string[];
   constructor() {
     this.names =["Toni", "Santi", "Guille", "Doge"];
    }

   ngOnInit() {
   }

 }
 ```
El tipo *string[]* aclara que es un arreglo de strings.

Ahora agreguemos esta data a nuestro template usando el atributo \*ngFor

```html
<ul>
  <li *ngFor="let name of names">Hello {{name}}</li>
</ul>
```

\*ngFor crea un nuevo elemento del DOM por cada item de una colleción

"let name of names": names es el arreglo el cual queremos iterar. y name es el nombre que le ponemos a cada item del arreglo a medida que iteramos.

Ahora en nuestro template principal cambiemos <app-user-item> por <app-user-list> y fijemosnos que pasa...


## Agregando el componente User item  

Ahora en vez de hacer un <li> por cada usuario vamos a buscar cargar el componente user-item

Vamos a dividir esto entre pasos:

Primero en lugar de renderizar un li por cada item vamos a renderizar UserItemComponent

```html
<app-user-item
*ngFor="let name of names"> </app-user-item>
```

Ahora si recargamos nuestra página vemos que seguimos tomando el name hard codeado de nuestro UserItemComponent, y no del arreglo names.

Para cambiar eso vamos a permitir a nuestro user-item aceptar inputs asi que ingresamos a su typescript y cambiamos lo siguiente:

```javascript
import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css'],
  inputs: ["name"]
})
export class UserItemComponent implements OnInit {
  name: string;

  constructor() {
 }

  ngOnInit() {
  }

}
```
Como vemos agregamos la propiedad inputs a nuestro componente donde ponemos un arreglo de las propiedades que vamos a tomar de nuestro *parent template*. Finalmente quitamos la data de nuestro contructor para que no tenga ningun valor por defecto.

Ahora veamos como utilizamos eso en nuestro template.

```html
<app-user-item
    *ngFor="let name of names"
[name]="name"> </app-user-item>
```

- [name]: Indica que queremos pasar un valor a la variable name del componente  user-item
- "name" viene de "let name", osea es el valor de cada elemento del arreglo names, para que quede mas claro lo podemos escribirlo

```html
  <app-user-item
  *ngFor="let individualUserName of names" [name]="individualUserName">
  </app-user-item>
```
