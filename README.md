DELILAH RESTÓ

#Objetivo:
Crear el backend para un sistema de pedidos online para un restaurante.

#Acciones User:
- Registrarnos
- Identificarnos
- Crear Órdenes
- Obtener solo sus Órdenes
- Obtener todo el catálogo de Platos disponibles

#Acciones Admin:
    .Platos:
        - Obtener Platos
        - Agregar Platos
        - Eliminar Platos
        - Actualizar Platos
    .Órdenes:
        - Obtener todas las Órdenes
        - Eliminar Órdenes
        - Actualizar status de las Órdenes
        - Crear Órdenes
    .Usuarios:
        - Actualizar role de Usuarios
        - Agregar un nuevo Usuario
        - Eliminar Usuarios
        - Obtener todos los Usuarios

1 - Clonar el proyecto desde tu consola

2 - Instalar dependecias

3 - Crear Base de Datos

Al clonar el proyecto hay un archivo llamado db.slq ahí están 
todas las tablas que debes crear para poder iniciar el servidor 
con la base de datos. También se encuentran la creación de las 
FOREIGN KEY para hacer la relación entre las tablas.

4 - Inicia el servidor

Tienes varias opciones para iniciar el servidor. Desde tu terminal estando en la carpeta delilah-resto puedes introducir cualquiera de estos comandos
    - node app.js
    - nodemon app.js
    - npm start



#API Desing Rutas:

- Registrarnos: POST api/auth/register

- Identificarnos: POST api/auth/login

- Agregar Productos: POST api/products

- Consultar Productos: GET api/products

- Eliminar Productos: DELETE apis/products/:productId

- Actualizar Productos: PUT api/products/:productId
