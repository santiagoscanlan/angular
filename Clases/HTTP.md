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
