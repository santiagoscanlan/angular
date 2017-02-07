# Routing in Angular

Para usar rutas en angular se puede hacer de dos formas distintas.

1. La primera por defecto sería "/home"
2. La segunda es la que vamos a utilziar porque es mas recomendada es "/#/home"

Esto utiliza el HashLocationStrategy, esto lo usabamos hasta ahora para ir al elemento con un id especifico. Pero ahora nos va a servir para mostrar determinados componentes en Anglar. Porque es mejor?
Porque si refrescaramos la página en "/home" le estariamos pidiendo al servidor una página que no tiene. Por eso nos aseguramos con el Hash Location Strategy que siempre iremos al Root page.

Para comenzar a agregar rutas en nuestra aplicación lo primero que tenemos que hacer es un poco de configuración en nuestro app.module

```javascript
// Agregamos estos Modulos
import {LocationStrategy, HashLocationStrategy} from "@angular/common";
import {Routes, RouterModule} from "@angular/router"

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes) // Y esto Aquí
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}], //Aquí definimos nuestra Estrategia
  //Si no poniamos nada por defecto seria el Path Strategy
  bootstrap: [AppComponent]
})
export class AppModule { }

```

Como vemos importamos varios madulos. LocationStrategy y hashLocationStrategy Lo utlizamos para proveer el servicio de rutas usando el hash. RouterModule le dice a nuestra app que queremos usar las rutas routes. Pero routes no lo tenemos definido hagamos eso.

```javascript
const routes: Routes = [
{path: "", redirectTo:"home", pathMatch:"full"} ,
{path:"home", component:HomeComponent},
{path:"users", component:UserComponent}
]
```

Aquí vemos que routes es un arreglo de rutas. Utilizamos Routes para tipificarlo. El primero nos dice que cuando no se defina la ruta nos va a redirigir to "home". El siguiente es "home" el cual dice q va a renderizar el componente HomeComponent y el segundo nos dice que la ruta "users" nos redirige a UserComponent.

Creemos estos Componentes, pero necesitamos decidir donde vamos a mostrar esos componentes. Vayamos a app.component.html para colocarlos en nuestro router-outlet

```html
<h1>Welcome To my App</h1>
<a [routerLink]="['/home']">Home</a>
<a [routerLink]="['/users']">Users</a>

<router-outlet></router-outlet>
```

Vemos que tenemos un link con el atributo **[routerLink]** que adentro tiene un arreglo con un solo item q es el route que queremos. Debajo tenemos *<router-outlet>* que nos inica donde se van a renderizar los componenetes. Probemos ahora nuestra app.

## Children Routes

Ahora utilizaremos childern routes, esto significa rutas anidadas a rutas mayores, por ejemplo "/users/main" main seria una children route de user y se mostraría dentro del componente de user. Utilicemos JSON placeholder para traer distintos usuarios, segun su id y mostremos una lista para poder elegirlos.

Esta parte va ser mas complicada primero vamos a crear el servicio de Placeholder:

```javascript
import { Injectable, Inject } from '@angular/core';
import {Http} from "@angular/http"
import {Observable} from "rxjs"
import "rxjs"
export const API_URL = "https://jsonplaceholder.typicode.com/"
@Injectable()
export class PlaceholderService {

  constructor(@Inject(API_URL) public url, public http: Http) { }

  query(id, type): Observable<any>{
    return this.http.request(this.url+type+"/"+id).map(res=>res.json())
  }
}
```

Por ahora no hay nada nuevo, creamos un servicio que tiene la funcion query que devuelve una observable de hacer un request a la api.

Ahora creemos las nuevas child routes.

```javascript

const childRoutes: Routes =[
  {path:"", redirectTo: "main", pathMatch:"full"},
  {path:"main", component: MainComponent},
  {path:":id", component: IdComponent}
]

const routes: Routes = [
{path: "", redirectTo:"home", pathMatch:"full"} ,
{path:"home", component:HomeComponent},
{path:"users", component:UserComponent, children: childRoutes}
]

```

Como vemos creamos unas childRoutes y se las agregamos a la propiedad children de "users". Ahora creemos los dos componentes que vamos a utilizar. vemos que una ruta es ":id" aqui le estamos diciendo que ira un parametro que sera el id del usuario que queremos buscar.

Agreguemos a usercomponent un <router-outlet> para que aparezcan los componentes.

Ahora veamos el template de MainComponent:

```html
<input type="number" #input placeholder="Search any id"><button (click)="search(input.value)" type="button" name="button">Search</button>
<p>Or choose someone from the List:</p>
<ul>
  <li><a href="" [routerLink]="['../1']">1</a></li>
  <li><a href="" [routerLink]="['../2']">2</a></li>
  <li><a href="" [routerLink]="['../3']">3</a></li>
  <li><a href="" [routerLink]="['../4']">4</a></li>
  <li><a href="" [routerLink]="['../5']">5</a></li>
  <li><a href="" [routerLink]="['../6']">6</a></li>
  <li><a href="" [routerLink]="['../7']">7</a></li>
  <li><a href="" [routerLink]="['../8']">8</a></li>
  <li><a href="" [routerLink]="['../9']">9</a></li>
  <li><a href="" [routerLink]="['../10']">10</a></li>
</ul>

```

Vemos que vamos a tener dos formas de acceder a los usuarios. La primera es a través de un link como ya habiamos visto antes. Le agregamos el "../" para que entre a "users/:id". La segunda es a traves de un input que cuando submitiamos corre la funcion search y le pasamos el valor del input como argumento a partir de q la creamos con #input en el elemento.

Ahora podemos ver como funcionaria esto en el componente:

```javascript
import { Component, OnInit } from '@angular/core';
import{Router} from "@angular/router"

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(public router: Router) { }

  search(id){
    this.router.navigate(["users/"+id])
  }
  ngOnInit() {
  }

}
```

Vemos que generamos la propiedad router a partir del modulo de Router, y lo utilizamos para navegar al id en la función search usando el metodo navigate.

Ahora que ya estamos accecediendo al id veamos su template:

```html
<div *ngIf="user">
  <h1>{{user.name}}</h1>
  <p>{{user.username}}</p>
</div> <a href (click)="back()">Back</a>

```

Vemos que tenemos un div que se va a mostrar si existe un user. Nos va renderizar el name y el username, y tenemos un boton que ejecuta la funcion back, que queremos que vaya a la pagina anterior.
Veamos como seria el componente ahora:

```javascript
import { Component, OnInit } from '@angular/core';
import  {PlaceholderService} from "../placeholder.service"
import {ActivatedRoute} from "@angular/router"
import{Location} from "@angular/common"

@Component({
  selector: 'app-id',
  templateUrl: './id.component.html',
  styleUrls: ['./id.component.css']
})
export class IdComponent implements OnInit {

  id:String
  user: Object

  constructor(public placeholderService: PlaceholderService, public route: ActivatedRoute, public location: Location) {
  this.route.params.subscribe(param=>this.id=param["id"])
  }

  back(){
    this.location.back()
  }

  ngOnInit() {
    this.placeholderService.query(this.id, "users").subscribe(res=>this.user=res)
  }
}
```
En este traemos el servicio de placeholder para buscar el user, usamos ActivatedRoute en el cual vamos a poder utilizar para sacar los parametros y asignalos a la propiedad id, y location que nos va a servir para ir para atras.

Ahora nuestra app ya deberia estar funcionando.
