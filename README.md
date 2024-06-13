# Proyecto Club Deportivo

## Configuración

Este repositorio ignora la carpeta node_modules, por lo tanto para ejecutarlo en local se debe crear el node_module con el siguiente comando:
```
npm install
```
Además se ejecuta con la dependencia de nodemon, por lo tanto para ejecutar el servidor se utiliza:
```
npm run dev
```

## Descipción del proyecto

Este proyecto consiste en la creación de un CRUD y en la persistencia de datos particularmente json.

A rasgos generales, por medio del CRUD se puede crear, leer, actualizar y eliminar deportes de una archivo json que funciona como data.

Este ultimo archivo nombrado incluye 3 deportes de manera inicial:
```
{
  "deportes": [
    {
      "nombre": "Fútbol",
      "precio": "50"
    },
    {
      "nombre": "Baloncesto",
      "precio": "30"
    },
    {
      "nombre": "Ping Pong",
      "precio": "80"
    }
  ]
}
```
Además el frontend se conecta con el backend para poder ejecutar el CRUD.
