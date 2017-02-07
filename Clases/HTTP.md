# HTTP Requests en Angular


Ahora vamos a ver como podemos mandar requests HTTP a través de angular.

Primero vamos a hacer un request muy simple a JSON Placeholder para ver rápidamente como funciona y desps haremos uno mas complejo utilizando el API de Youtube.

Normalmente hasta ahora habiamos visto que podíamos utilizar promises y callbacks para responder a los requests asincrónicos. Con angular podemos utilizar ambos metodos o una tercera opción recomendada llamada Observables de la libreria RxJs. En este clase no vamos a ver en profundidad esta libreria, pero vamos a ver como utilizarlo en simples rasgos en eventos del DOM y requests HTTP. También veremos mas adelante que podemos utilizarla en Redux!!


## Observables

Las observables las tenemos que pensar como un stream de datos. A medida que van llegando se van pasando por funciones muy parecidas a las de las librerias de underscore.

Miremos este ejemplo. Primero utilizaremos interval para crear una observable que emita un numero cada x milisegundos.

```javascript
var observable = Rx.Observable.interval(500)
```

Esta observable va seguir emitiendo valores cada 500 milisegundos, como no queremos que nunca se detenga vamos a usar el metodo take que va tomar un número como argumento diciendo cuantos valores va emitir esa observable antes de detenerse.

```javascript

observable.take(10)

```

ahora la observable solo va a emitir 10 valores y despues se detendra. Como podemos ver que esto esta funcionando? Utilizando el metodo subscribe. Subscribe como dice el nombre se subscribe a una observable y cada vez que llega un valor ejecuta una función:

```javascript


```

Ahora veamos mas cosas divertidas que podemos hacer con una observable. Una misma observable puede crear varios streams distintos. osea que cada vez que emite un valor puede ir a distintos streams.

```javascript

observable.take(10).subscribe(x=>console.log(x))

observable.take(5)
.filter(x=>!(x%2))
.map(x=>x*2)
.subscribe(x=>console.log(x))

```

Ahora podemos ver que estamos usando otras funciones que conocemos bastante bien de otras librerias como filter y map, y lo que llega a subscribe es un valor transformado de lo que se emitió.

Esto de por si ya es muy interesante pero veamoslo en un ejemplo mas copado. Creemos rapidamente un mousedrag utilizando RxJS.


Hagamos un div#box que se vea en nuestra pagina y pensemos como resolver el problema. Tenemos tres tipos de evento el primero es clickear el box, mover el mouse y soltar el box creemos una observable para cada uno de estos eventos utilizando fromEvent


```javascript

const box =document.querySelector("#box")

const mouseDown = Rx.Observable.fromEvent(box,"mousedown")
const mouseUp = Rx.Observable.fromEvent(box,"mouseup")
const mouseMove = Rx.Observable.fromEvent(window, "mousemove")

```

Ahora como deberiamos pensarlo en observables. Queremos que cuando clickiemos #box se mueva hasta que soltemos el mouse. para eso vamos a utilizar el metodo .takeUntil() que funciona parecido a take, pero es hasta que otra observable emite un valor, esta seria cuando soltamos el mouse.

```javascript

mouseDown.subscribe(e=>{
  mouseMove.takeUntil(mouseUp)
  .subscribe(e=>{
    box.style.top = e.PageY+"px"
    box.style.left = e.PageX+"px"
  })
})
```

Ahora ya esta de una forma muy sencilla utilizamos observables para crear un mouse drag.


Ahora probemoslo en angular.


## Simple HTTP Request

Ahora hagamos una app de Angular que solo nos traiga el primer request de Json Placeholder.

Para eso vamos a utilizar el modulo de HTTP que ya ng-cli nos lo agrega en nuestro proyecto.

Generemos un nuevo componente, llamemoslo FirstHttpRequest.

Ahora en ese componente importamos el modulo Http de "@angular/http"

Veamos como se veria nuestro template del componente.


```html
<button (click)=makeRequest()>Make Request</button>
<div *ngIf="loading"> Loading..... </div>
 <pre>{{ data | json }}</pre>
```

Podemos ver que tenemos un boton que cuando lo clickeamos ejecuta la funcion makeRequest(). Luego un div con un \*ngIf que si el valor loading es verdadero mostrará un mensaje de loading y finalmente en un tag pre, mostramos data con un pipe de json. Los pipe son funciones que toman el valor a la izquierda y retornan un nuevo valor de nuestra informacion. En este caso json convierte un objeto en un string.


Viendo lo que necesitamos para hacer funcionar el template podemos definir nuestro componente.

```javascript
export class FirstHttpRequestComponent implements OnInit {
data: Object
loading: boolean
  constructor(public http: Http) {
  this.loading = false }

  makeRequest(){
    this.loading =true
    this.http.request("https://jsonplaceholder.typicode.com/posts/1").map(res=>res.json()).subscribe(res=>{
      this.loading=false
      this.data = res
    })
  }

  ngOnInit() {}
}
```
Bueno tenemos muchas cosas nuevas así que vayamos paso por paso.

Primero vemos algo muy simple tenemos la propiedad data, donde va ir el objeto que vamos a recibir de la api, y la propiedad loading que va ser un booleano. Despues en nuestro constructor con public generamos la propiedad http y le inyectamos el modulo Http de angular. Dentro del constructor le asignamos a loading el valor de *false*

Luego creamos la función makeRequest() y aquí viene lo interesante. utilizamos el metodo request para solicitar la pagina de JSON Placeholder. Lo que nos devuelve request es una observable entonces mapiamos el resultado y lo convertimos en objeto, finalmente nos subscribimos al evento y le asignamos la informacion a data.

Tambien podemos ver que cambiamos la propiedad loading a true, y una vez que llego la data la volvimos a cambiar false.



## Youtube Search App

Ahora hagamos una app un poco mas interesante. En la que busquemos videos de youtube. A medida que vamos ingresando al input van a ir apareciendo los resultados.

En el ejemplo anterior hicimos de una forma muy simple el request http, pero para request mas complejos Angular nos recomienda crear servicios. Asi que lo primero que haremos es generar un YoutubeService.

```javascript
import { Injectable, Inject } from '@angular/core';
import {Http, Response} from "@angular/http"
import{Observable} from "rxjs"
import "rxjs"
import {Video} from "./video-model"

export const API_URL: String = "https://www.googleapis.com/youtube/v3/search"

export const API_KEY: String ="AIzaSyCVn2FYVgmAQ1NpToQ-qmSvLcxCY8HFx20"

@Injectable()
export class YoutubeService {

  constructor(@Inject(API_URL) private url: String, @Inject(API_KEY) private key: String, public http: Http) { }

  search(term): Observable<Video[]>{
    const params : String =[
      `part=snippet`,
      `q=${term}`,
      `type=video`,
      `key=${this.key}`,
      `maxResults=10`
    ].join("&")

    return this.http.request(`${this.url}?${params}`)
    .map(res=>{
      return res.json().items.map((video):Video=>{
        return new Video({
          title: video.snippet.title,
          id: video.id.videoId,
          thumbnail: video.snippet.thumbnails.default.url,
          description: video.snippet.description
        })
      })
  })
}

  }

```

Primero generamos los valores del url y el token key que vamos a usar en la aplicación, los exportamos porque tambien los queremos proveer en nuestra aplicación, esto lo hacemos por si queremos proveer otro valor para testing, production, o development poder hacerlo facilmente desde nuestro NgModule.


Luego injectamos estos valores a nuestra aplicación y ademas utilizamos el modulo Http de Angular con el cual vamos a hacer los requests.

Luego vamos a crear la función search esta funcion va tomar un term de busqueda y va hacer el request a youtube. Como vemos estamos devolviendo una observable de un arreglo de videos(osea que tenemos un tipo de dato llamado Video definido)

Vayamos a ver como se ve nuestro Video

```javascript

export class Video {
  title: String;
  link: String;
  thumbnail: String;
  description: String;

  constructor(obj){
    this.title = obj.title
    this.link = `https://youtube.com/watch?v=${obj.id}`
    this.thumbnail = obj.thumbnail
    this.description = obj.description

  }

}

```

Aquí no hay mucho que exlicar, solo vemos que propiedades y valores vamos a utilizar para generar nuestro Video.

Volvamos a nuestra función de search(). Creamos los parametros con los cuales vamos a hacer el request y luego lo realizamos. Mapeamos el response, lo pasamos a json() eso tomamso la propiedad items donde estan todos los videos y lo mapeamos, para convertir cada resultado en una clase video, de esta manera devolvemos un Video[]. Genial ya tenemos nuestro servicio de Youtube resuelto. No nos olvidemos de proveerlo en nuestro NgModule.


Ahora creemos el componente de youtube en el cual vamos a escribir nuestra aplicación. Primero veamos nuestro HTML para entender que vamos a necesitar en nuestro componente.


```html
<input id="searchBox">
<search-results [results]="results"></search-results>
```

En una verdadera App de Angular deberiamos haber puesto el searchBox como un componente aparte que emita los resultados y se lo envie a search result, pero para mantener las cosas lo mas simple posibles simplemente lo pusimos en un input.

Luego tenemos el componente SearchResults que toma como input results.

Entonces lo que deberia hacer este componente es tomar el valor del serchBox, hacer un pedido al servicio de youtube y una vez que tiene los resultados enviarlo al componente de SearchResults donde seguramente se renderizen los resultados.

Ahora si veamos entoces nuestro YoutubeComponent

```javascript
export class YoutubeComponent implements OnInit {
  results : Video[]

  constructor(public youtubeService: YoutubeService, public elemRef:ElementRef) {
    }

  ngOnInit() {
    const searchBox = this.elemRef.nativeElement.querySelector("#searchBox")
    Observable.fromEvent(searchBox, "keyup").map((e:any):String=>e.target.value)
    .filter(text=>text.length>1)
    .debounceTime(300)
    .map(term=>this.youtubeService.search(term))
    .switch()
    .subscribe((results:Video[]):void=>{
      this.results = results
    })

  }

}
```

Como suponíamos tenemos una propiedad results donde vamos a poner el arreglo de videos que nos llegue del servicio de youtube. En el contructor utilizamos elementRef para tomar el valor del elemento del DOM y el servicio de youtube.

Finalmente en ngOnInit agregamos el evento. Esto lo hacemos porque vamos a querer agregar el evento una vez que el componente se haya inicializado, sino podriamos tener problemas tomando a los elementos del componente.

Entonces primero capturamos el input#searchBox y luego creamos una observable del evento "keyup". Ahora mapeamos el valor de input utilizando la informacion del evento que entrá, su propiedad target es el elemento del dom que activo el evento y devolvemos su valor. Ahora podemos usar algunos filtros para no enviar requests por cada keyup que hace el usuario. Hacemos que el length del arreglo tenga que tener por lo menos dos caracteres y que tengan q haber pasado por lo menos 300 milisegundos desde que dejo de tipear para enviar el evento. Luego mapeamos lo que llega para devolver el resultado del request utilizando el servicio de Youtube, y .switch() hace que tome el ultimo evento emitido descartando los anteriores, ya que los requests pueden llegar en distinto orden, y uno mas viejo pisar el mas nuevo. Una vez que tenemos el resultado del request nos subsribimos a la observable para darle el resultado a this.results.

Ahora veamos el componente SearchResults que es donde van a pasar los resultados.

```html
<div *ngFor="let result of results">
  <video-result [result]="result"></video-result>
</div>

```

Entonces vemos que los resultados que pasan hacemos un ngFor creando por cada resultado un video-result. El template de video-result es:

```html
<div class="">
  <a href="{{result.link}}"><img src="{{result.thumbnail}}" alt=""> </a>
  <h1>{{result.title}}</h1>
  <p>{{result.description}}</p> <a href="{{result.link}}">Watch Video</a> </div>
```

Aquí colocámos los resultados en el template. En los componentes solo debe tomar los valores que estamos usando en el template y nuestra página ya estaría funcionando.

Si querriamos hacer mas pro esta página el searchbox debería ser un componente aparte que emita los resultados de busqueda, y también podria emitir el valor de una variable loading para que aparezca en la pagina cuando esta cargando.
