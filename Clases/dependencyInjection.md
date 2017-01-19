# Dependency Injections

Las dependency injections nos van a permitir agregar servicios globales a toda nuestra aplicación. Porque son utiles?

1. Podemos cambiar la dependencia del servicio cuando testiamos, en development y en production.
2. Los Dependency Injections son singleton, esto significa una sola instancia de la objeto alrededor de toda nuestra app.
3. Podremos crear nuevas instancias del mismo servicio con diferentes propiedades.

## Nuestro Primer Dependency

Primero veamos como crear un servicio básico que nos permita loguear algo en la consola.
Para eso:
1. Creamos el servicio (ng generate service my)
2. Lo Proveemos en nuestro modulo
```javascript
  providers:[MyService]
```
3. Lo injectamos en nuestro componente
```javascript
  constructor(public service: MyService)
```

### Para testear

Ahora creemos otro servicio parecidio al original que vamos a utilizar para testear o si estamos en development

1. Creamos el nuevo servicio(ng generate service mockMy)
2. y utilizamos la propiedad useClass: para agregarlo
```javascript
  providers:[{provide:MyService, useClass:MockMyService}]
```

Ahora todo seguirá funcionando igual solo que cuando se llame al servicio MyService se utilizará MockMyService

Podemos utilizar por ejemplo una variable isInProduction y chequear para elegir que servicio usar.

```javascript
  providers:[{provide:MyService, useClass:isInProduction?MyService:MockMyService}]
```

Ahora imaginemos un servicio que necesito argumentos en su contructor por ejemplo:

```javascript
@Injectable()
export class SayMyNameService {
name: String
  constructor(name:String) {
  this.name=name
  }
  run(){
    console.log(this.name)  
  }
}
```

En este caso lo que vamos a utilizar es useFactory:

```javascript
  providers:[{provide:SayMyNameService, useFactory:()=>new SayMyNameService("Guille")}]
```

Ahora solo agregemoslo a nuestro componente y listo lo podemos probar agregando otro boton a nuestro template.

Ahora imaginemos que quiero sacar el nombre del argumento de otro servicio llamado UserService.
1. Por ahora creemos el servicio e instanciemoslo con un string
```javascript
export const UserService: String = "USER"
```
2. Demosle un valor cuando lo proveemos (useValue) para probar si podemos hacerlo funcioinar correctamente

```javascript
providers:[
  {provide: UserService, useValue: "Guille"},
  {
    provide:SayMyNameService,
    useFactory:(userService)=>new SayMyNameService(userService), deps[UserService]
  }
]
```


Ahora hagamos mas interesante UserService y en su class creemos un arreglo de usuarios y creemos el metodo getRandomUser para tomar un usuario random, utilizaremos eso en SayMyNameService.

Ahora cada vez que refreshiamos la página deberiamos ver un usuario nuevo, pero como vemos el servicio solo se instancia una vez entonces no volvemos a conseguir un random user. Como podemos hacer para conseguir que se re instancie el servicio de sayMyName cada vez que clickeamos.

Podemos llamar nosotros mismos nuevos injectors utilizando ReflectiveInjector.resolveAndCreate()

```javascript
var injector = ReflectiveInjector.resolveAndCreate([
    {
      provide: SayMyNameService,
      useFactory: ()=>{
        return new SayMyNameService(this.userService.getRandomUser())
      }
    }
  ])
    this.sayMyName=injector.get(SayMyNameService)
```

Lo mejor sera poner esto en un servicio aparte por lo que quedaría

```javascript
runName(){
    this.sayMyName.run()
    this.sayMyName = this.injector.getNewName()
}
```

## Utilizando la misma instancia del servicio

Acabamos de ver un ejemplo en el que podemos generar nuevas instancias de un mismo servicio. Ahora fijemonos como podemos utilizar el mismo servicio en toda nuestra app.

1. Agreguemos el metodo addUser a nuestro UserService en el cual tome un argumento y pushie ese argumento al arreglo.
2. Ahora solamente agreguemos un input a nuestro template y un boton en el cual ejecute addUser cuando lo clickeamos.

Podemos ver que si clickeamos para ver los randomUsers, estamos utilizando la misma instancia del servicio a pesar de que lo estamos llamando por lugares muy distintos.
