# Setiando Angular

## Instalar Dependencias

``` $ sudo npm install -g typescript
```

También instalar angular -cli

``` $ sudo npm install -g angular-cli
```

Instalar [brew](http://brew.sh/) y una vez instalado correr:

``` $ brew install watchman
```


El comando ```ng new``` nos va permitir crear un nuevo proyecto

```ng new angular2_hello_world
```

Abramos el archivo src/index.html. Podemos ver el tag app-root, aquí es donde nuestra app va ser renderizada.

EL texto Loading... es un placeholder que se va a mostrar antes de que nuestra app cargue, aquí podemos poner lo que queramos hasta un gif de un spinnner o cualquier otro mensaje de Loading.

Pra correr nuestra aplicacion en el browser hay que correr un servidor a traves de angular-cli.

En tu carpeta raiz del proyecto corre:

``` ng serve
```


Si aparece "app works!" en http://localhost:4200 significa que hemos hecho todo bien.
d
