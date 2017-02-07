# Built-in Components

##NgIf

ngIf mostrara un elemento si la condicional es verdadera:

```html
<div *ngIf ="false"></div><!--No se va a mostrar-->
<div *ngIf ="x<y"></div><!--se va a mostrar si x es menor a y-->
```

## NgSwitch

ngSwitch se fijará si una variable tiene un determinado valor y mostrara un elemento según eso.


```html
<div class="container" [ngSwitch]="myVar">
   <div *ngSwitchCase="'A'">Var is A</div>
  <div *ngSwitchCase="'B'">Var is B</div>
   <div *ngSwitchCase="'C'">Var is C</div>
   <div *ngSwitchDefault>Var is something else</div>
 </div>
 ```

 Como vemos en el ejemplo myVar es asignado al ngSwitch,y luego muestra un elemento demendiendo del valor de la variable con ngSwitchCase, si no llegará a cumplirse ninguna de las anteriores, con ngSwitchDefault funcionaría como un else.

## NgStyle

 Nos va a servir para definir el estilo de forma dinamica.

[ngStyle]="{color: colorInput.value}"

ó

[style.font-size.px]="fontSize"


## ngClass

Classs utiliza un objeto de clases donde el key es el nombre de la clase y la propiedad si es true la muestra si es false no.

```css
.bordered{
  border: 2px solid black
}

```


```html
<div [ngClass]="{bordered:true}">Tengo borde</div>

<div [ngClass]="{bordered:false}">No tengo borde</div>


<!-- Tambien podemos usar un arreglo de clases -->

<div [ngClass]="[blue, round]"> --- </div>

```

Esto mismo se puede cambiar por variables para hacerlo dinámico.



```html
<div [ngClass]="classObj">Tengo borde</div>

<div [ngClass]="classList">No tengo borde</div>

```
