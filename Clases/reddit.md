## Reddit Clone

La pagina va tener un form  donde publicamos links con un título y se van mostrando uno abajo del otro con la posibilidad de upvotearlos o downvotearlos.

la aplicacion va tener dos componentes. El componente de la app donde estará el form y los articulos, y despues cada articulo va ser un componenente en si mismo.

Lo primero que hacemos es iniciar una nueva app de angular

```$ ng new angular2_reddit
```

Entrando a app.component.ts podemos ver el template del componente principal de la app, que seguramente sea app.commponent.html. Aqui agregamos rápidamente un form donde tendremos dos campos Title y Link.

Ahora al final del form agregamos un botón en el cual podamos submitear nuestro post escribe esto:

```html
<button (click)="addArticle()">
   Submit link
</button>
```

Esto lo que indica es que cuando este boton sea clickeado llamara a una función llamada addArticle

Asi que creemos esa función en appComponent, addArticle por ahora solo tomará como argumentos un title y un link que ambos seran un HTMLInputElement y los mostrará en la consola.

Entonces deberiamos agregar esos dos argumentos al momento de ejecutar la función. ¿Cómo hacemos eso?

Primero dentro de los tags input colocamos #nuevoTitle #nuevoLink esto lo que va a hacer es crear las variables dentro del template y tomará el objeto de input como su valor. Ahora solo agregamos esas variables sin los hashtags a nuestra  ejecución de la función.


Ahora creemos el componente del article. Dentro de su template vamos a colocar los valores de los votos, el titulo, y ese titulo deberia estar dentro del link.

Ademas agregaremos en un link upvote y downvote que ambos van a ejecutar una funcion para bajar y subir los votos.

Ahora cambiemos la clase de nuestro ArticleComponent para que tenga las tres variables que usamos en el template y hardcodiemos sus valores en el constructor y sumemos las funciones voteUp() y voteDown().

Agreguemos el tag <app-article></app-article> en nuestra app para que se vea en pantalla.

Si probamos nuestro codigo los links para votar refreshean la pagina esto es por que el click event se propaga y abre el href vacio que hace q la página se recargue para evitar esto debemos hacer que nuestras funciones devuelvan false, que le dice al browser que no propague el evento.


## Varios articulos

Hasta ahora solo tenemos un articulo, y si quiseramos poner otro deberiamos agregar otro tag, el cual tendria la misma info, lo cual seria poco interesante

### Crando un Article class

Una buena practica cuando escribimos con angular es aislar la estructura de nuestra data  de nuestro componente .Creemos el archivo article.model.ts y generemos la clase Article con  un contructor q tome los tres como argumentos y q votes sea opcional (votes?). Si no llegase a haber votes le vamos a dar el valor de 0. No nos olvidemos de exportar la clase.

Ahora en nuestro componente solo tenemos q importar esa clase, aclarar que article es de tipo Article y después en nuestro contructor escribir los datos por ahora harcodeados. Que le tenemos que agregar a upVote y downVote para que funcionen??

Ahora deberiamos modificar nuestro template para que busque la información en nuestro objeto article.


### Ley de Demeter

  Esta ley dice que un objeto deberia asumir lo menos posible sobre la estructura de otros objetos.

  Si vemos nuestas funcionen de upVote estamos cambiando las propiedades internas de del articulo directamente. Se podría decir que nuestro ArticleComponent sabe demasiado sobre la clase Article.

  Podríamos mejorar este codigo agregando los metodos a nuestra clase y después solo ejecutarlos en nuestro componenente


## Usando multiples articulos

Primero hagamos que AppComponent tenga un arreglo de articulos, y harcodiemos la data en el constructor.

Ahora haremos que el AricleComponent acepte un article como Input.

Ahora hacemos un \*ngFor para generar un ArticleComponent por cada articulo en el arreglo de articulos en AppComponent.

## Agregando Nuevos Articulos

Ahora solo refactoriemos nuestro código para que la función addArticle agregue un articulo nuevo a nuestro arreglo de articulos.

Tambien podríamos hacer una funcion que devuelva el arreglo ordenado por cantidad de votos, y mostrar eso en pantalla.
