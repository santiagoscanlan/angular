# Inventory App

Vamos a hacer un app que nos permita agregar productos a una lista.

Vamos a tener un form para agregar productos, y debajo una lista de productos, con todos los productos que agreguemos. Nos vamos a focalizar en Angular, asi q la idea es no utilizar base de datos simplemente vamos a utilizar un arreglo products que va a estar en nuestro AppComponent.

Los productos van a tener la propiedad, nombre, imgUrl, precio y departamento.

El departamento va a ser un arreglo de subdepartamentos por ejemplo

```
['Tecnologia', 'Celulares', 'Apple']

```

y se debería renderizar en la pagina como **Tecnologia > Celulares > Apple** , por ahi para lograr esto tengas que averiguar como tomar los indices del \*ngFor

Ademas el encabezado de nuestra página tendra un título que dirá cual es el producto seleccionado, y cambiará según que producto clickiemos.

Ademas tiene que tener un select para decidir si queremos que los productos se ordenen de manera alfabetica o por precio ambos de forma ascendente o descendente.

**Tu form debe tener validadores**

Como mínimo debes tener estos componentes:

1. AppComponent
2. ProductListComponent
3. FormComponent
4. ProductComponent


Si terminaste te podes ir a tu casa porque ya no se me ocurrierron mas consignas, a menos que te quieras poner creativo.
