# Prueba Técnica

Realizada con NodeJS y ReactJS (ES6). Consiste en un pequeño catálogo de productos, con sus detalles. Adicionalmente, la aplicación se conecta con la API Simple Ripley, guardando todas sus respuestas en Redis.

## Deploy

La aplicación está deployada en Heroku. Se puede acceder haciendo click [aquí](https://catalogo-prueba.herokuapp.com/).
Los deploys son automáticos haciendo push a master.

## Build Manual

Si se desea hacer un build manual, basta ejecutar los siguientes comandos

```
npm start
npm run heroku-postbuild
```

El primer comando hace el build de la aplicación de NodeJS, mientras que el segundo consiste en hacer el build productivo de la aplicación ReactJS.

## Estructura del Proyecto

La base del proyecto es una aplicación NodeJS, mientras que en la carpeta `client` puede encontrarse la aplicación ReactJS (creada con `create-react-app`). Este último hace proxy a las API.
En modo productivo, la API se encarga de servir los archivos del cliente de manera estática.

## Redis

La API utiliza Redis para guardar las respuestas de la API SimpleRipley. En Heroku, se instaló el addon Redis (gratuito). En modo local, es posible instalarlo mediante `Docker`

```
docker run --name redis -p 6379:6379 -d redis
```

Este comando expone el puerto 6379 para desarrollo.

## Variables de Entorno

Actualmente, el sistema consta de 2 variables de entorno:

- REDIS_URL: Para conectarse a redis. Si no está configurada, se utilizará la conexión por defecto (`redis://127.0.0.1:6379`)
- PORT: Puerto para correr la API. Si no está configurado, se utilizará el puerto 5000.

## Consideraciones Adicionales

- La aplicación no cuenta con testings.
- Se cargaron de manera estática 25 SKUs.
- La página cuenta con barra de búsqueda por SKU.
- La página cuenta con productos visitados recientemente.
- El diseño está basado completamente en la página oficial, sin embargo, hay variaciones por simplicidad.
- Se desarrolló con React 16.8, haciendo uso extensivo de Hooks.
- Al momento de desarrollar, se utilizó VSCode, con los plugins Prettier + ESLint para mayor claridad del código.
