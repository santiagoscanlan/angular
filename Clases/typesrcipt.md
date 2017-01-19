# TypeScript

Angular2 esta construido en Typescript. Puedes escribir ES5 o ES6 para Angular pero hay algunas ventajas que podemos aprovechar de Typescript.

1. Tipos
2. Clases
3. Anotaciones
4. Imports
5. Utilidades del lenguaje

Veamos alguna de ellas:

## Tipos

Como su nombre indica su mayor mejora es que tipifica el lenguaje. Esto puede ayudar a:
1. Evitar bugs en nuestro codigo.
2. Ayuda a leer codigo porque clarifica tus intenciones.

Podemos aclarar el tipo de variable:
```javascript
var a: string = "hello"
```

También podemos especificar en una función el tipo de los argumentos o del valor que devuelven
```javascript

var decirHola = function(name:string): string{
  return "Hola "+name
}
```

La tipificación es opcional en typscript, si queremos escribir un código rápido no es necesario tipificarlo.

Los tipos de datos son:
- Strings
- Number
- Boolean
- Array
- Enums
- Any
- Void

Bajemos TSUN, un REPL de Typscript, para probar los siguientes codigos
``` npm instal -g tsun
```



### Strings, Number, Booleans

Estos los ponemos juntos porque ya los conocemos muy bien.
```javascript
var a: strings = "hello";
var b: number = 3;
var c: boolean = true;
```


### Arrays

Los arreglos tienen una característica especial,podemos aclarar que tipo de datos estan en ese arreglo

Hagamos un arreglo de Strings
```javascript
var stringArray: string[] = ["Hola", "como", "estas"];
```

Si quisieramos hacer un arreglo de numeros y string?

```javascript
var num_strArray: (number | string)[] = [1,2,"hola","chau"];
```

### Enum
Enum asigna nombres a valores numericos, veamos lo en acción.

```javascript
enum Role {Employee, Manager, Admin};

var role : Role = Role Employee;

```
## Any

any nos permite aceptar cualquier  tipo de valor para una variable. Este es el valor por defecto si no aclaramos el tipo a la variable.

```javascript
var something: any = "soy un string";
something=1;
something = [1, 2, 3];
```

### Void

Void significa que no se espera ningún tipo. Esto se usa normalmente para funciones que no devuelven ningun valor.

```javascript
function setName(name: string): void {
  this.name = name;
}
```

## Class

Una class es un template de las propiedades y metodos de un objeto. Para crear una clase usamos la keyword *class*. Asi se vería la clase de una persona.

```javascript
class Person{
  first_name:string;
  last_name: string;
  age: number;
}

```
### Metodos

Podemos agregar Metodos a nuestro objeto.

```javascript
class Person{
  first_name:string;
  last_name: string;
  age: number;

  greet(): void {
    console.log("Hello", this.first_name)
  }
}  
```


Para ejecutar la función greet() primero deberias crear una instancia de ese objeto.
```javascript
var p: Person = new Person()

p.fist_name = "Guille";

p.greet()
```

###  Constructor
El constructor es la función que se ejecutara cuando una nueva instancia del objeto sea creada. Normalmente ahi realizamos un setup inicial de nuestro objeto.


```javascript
class Person{
  first_name:string;
  last_name: string;
  age: number;

  constructor(first_name:string, last_name:string, age: number){
    this.fist_name = first_name;
    this.last_name = last_name;
    this.age = age;
  }

  greet(): void {
    console.log("Hello", this.first_name)
  }
}

var p: Person = new Person("Toni", "Tralice", 30)
```


### Inherencia

La inherencia nos permitirá que una clase reciva comportamiento de un pariente, luego se puede modificar esos comportamientos.

Imaginemos que tengo una clase que es un recrangulo

```javascript
class Rectangulo{
  altura: number;
  ancho: number;
  forma: string = "Rectangulo";

  constructor(altura: number, ancho: number){
    this.altura = altura;
    this.ancho = ancho;
  }

  area():number{
    return this.altura*this.ancho
  }
}
```

Ahora imaginemos que quiero agregar una nueva clase cuadradado, que va tener propiedades muy parecidas a las de rectangulo.

```javascript
class Cuadrado extends Rectangulo{
  constructor(altura:number, ancho:number){
    super(altura, ancho)
    this.forma ="Cuadrado"
  }
}

var c: Cuadrado = new Cuadrado(2,2)
c.area()
```


## Utilidades

### Fat Arrow Functions

Las fat arrow function nos van a permitir escribir funciones cortas de forma inline y mucho mas corta, especialmente cuando lo usamos para high-order functions. Por ejemplo:

```javascript
var profes = ["Toni", "Santi", "Guille"];

data.forEach(fucntion(nombre){
  console.log(nombre)
});

// Con las fat arrows en Typescript lo podemos escribir asi

var profes: string[] = ["Toni", "Guille"];

profes.forEach((nombre) => console.log(nombre));

```

Una característica importante de => es que comparte el mismo this que el codigo a su alrededor. Por ejemplo en ES5 normalmente vemos:

```javascript
var person = {
  name: "Juan",
  instrumentos: ["guitarra", "piano", "armonica"],
  imprimirInstrumentos: function(){
    var estaPersona = this
    this.instrumentos.forEach(function(instrumento){
      console.log(estaPersona.name+" toca "+ instrumento )
    })
  }
}
```
Podríamos en lugar de eso escribir

```javascript
var person = {
  name: "Juan",
  instrumentos: ["guitarra", "piano", "armonica"],
  imprimirInstrumentos: function(){this.instrumentos.forEach((instrumento)=>{
    console.log(this.name+" toca " + instrumento)
  })}
}
```

## Template Strings

Esto nos va permitir colocar variables en nuestro string y hacer strings con multilinea

### Variables en un string

```javascript
var fistName="Guille", lastName="Aszyn"

var greeting = `Hello ${firstName} ${lastName}`
```

Como vemos para utilizar la interpolicion de string debemos usar las tildes invertidas.

### Multiline string

Esta caracteristica nos va servir mucho para hacer html templates.

```javascript
var template = `
<div>
  <h1>Hola</h1>
  <p>Esta es un gran sitio</p>
</div>
`
```
