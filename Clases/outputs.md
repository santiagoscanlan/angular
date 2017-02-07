# Outputs

Ya vimos como podemos enviar informacion dentro de un componente. Ahora veamos como podemos enviar la información hacia afuera.

Creamos una nueva aplicación que tenga una lista de nombres y cuando clickeamos en un nombre de la lista aparece por encima de ella.

Primero creemos el html de nuestro componente principal:

```html
{{name}}
<name-list (nameSelected)="changeName($event)"></name-list>
```
 Vemos que tenemos una variable name que vamos a utilizar para mostrar el ultimo nombre clickeado.

 **(nameSelected)** nos indica que en el componente *name-list* va emitir un evento con ese nombre, y cuando suceda queremos que ejecute la función **changeName**. *$event* es la data que vamos a emitir de ese evento, que se lo estamos enviando como argumento de la funcion.

 Ahora veamos como se ve el componente:

 ```javascript
 export class AppComponent {
  name: string

  constructor(){
    this.name=""
  }

  changeName(name){
    this.name=name
  }
}
```
Vemos que esto es bastante simple. Tenemos la propiedad name que es un string vacio, y la función changeName que toma el nombre como argumento y se lo asigna a la propiedad name del componente.


Muy bien por ahora todo muy simple sabemos que *name-list* va a emitir un nombre que nosotros vamos a tomar y se lo vamos a asignar a la propiedad name. Ahora veamos el html de *name-list*:

```html
<ul>
  <li *ngFor="let name of names" (click)="nameClicked(name)">{{name}}</li>
</ul>
```
Aca podemos ver que estamos iterando sobre una lista de nombre y creando un list item por cada nombre.
En cada uno mostramos los nombres en la vista y tenemos un evento click que ejecuta nameClicked pasando el name como argumento.

Ahora veamos como definimos estas dos cosas en nuestro componente:

```javascript
@Component({
  selector: 'name-list',
  templateUrl: './name-list.component.html',
  styleUrls: ['./name-list.component.css'],
  outputs: ["nameSelected"]
})
export class NameListComponent implements OnInit {
nameSelected: EventEmitter<string>
names : string[]
  constructor() {
    this.nameSelected = new EventEmitter()
    this.names = ["Santi", "Toni", "Guille"]
    }

    nameClicked(name){
      console.log("clicked!")
      this.nameSelected.emit(name)
    }

  ngOnInit() {
  }

}
```

Como vemos en nuestro **@Component** definimos nuestro outputs.
Luego utilizamos *EventEmitter* para tipificar **nameSelected** y decir que va a emitir un string. Desps configuramos nuestro EventEmitter con el keyword ```new```. Finalmente en la función nameClicked emitimos el nombre.


Listo ahora probamos nuestra app!
