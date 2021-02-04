DELILAH RESTÓ

#Objetivo:
Crear el backend para un sistema de pedidos online para un restaurante.

#Acciones User:
- Registrarnos
- Identificarnos
- Crear Órdenes
- Obtener solo sus Órdenes
-Obtener todo el catálogo de Platos disponibles
----------------------------------------------------------------------------------------------------------

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
----------------------------------------------------------------------------------------------------------

1. Clonar el proyecto desde tu consola

copia y pega esta línea de comando

git clone https://github.com/Ifrainmedinagarcia/delilah-resto.git
----------------------------------------------------------------------------------------------------------

2. Instalar dependecias

copia y pega esta línea de comando

npm i
----------------------------------------------------------------------------------------------------------

3. Crear Base de Datos

Al clonar el proyecto hay un archivo llamado db.slq ahí están 
todas las instrucciones para la creación las tablas que debes 
crear para poder iniciar el servidor con la base de datos. 
También se encuentran la creación de las FOREIGN KEY para 
hacer la relación entre las tablas.
----------------------------------------------------------------------------------------------------------

4. Crear archivo .env

Debes crear un archivo .env para guardar las variables de entornos:

- TOKEN_SECRET
- EXPIRES

Debe estar escrito tal cual como se muestra en este documento.

- TOKEN_SECRET (es el token que se necesita para generar y decoficar 
el token de cada usuario y así poder hacer las diferentes acciones, 
recuerda que este token debe estar en una variable de entorno y el string debe estar oculto)

- EXPIRES (es el tiempo de validez que tendrá el token 
del usuario para hacer operaciones).
----------------------------------------------------------------------------------------------------------

5. Inicia el servidor

Tienes varias opciones para iniciar el servidor. Desde tu terminal o editor de código(en la consola) y estando en la carpeta delilah-resto puedes introducir cualquiera de estos comandos:
    - node app.js
    - nodemon app.js
    - npm start
----------------------------------------------------------------------------------------------------------

6.Puedes ir a swagger copiar y pegar el contenido del archivo YAML para entender mejor el funcionamiento de la API
----------------------------------------------------------------------------------------------------------

7. EDPOINT

#API Desing Rutas:

- Registrarnos: POST api/auth/register

- Identificarnos: POST api/auth/login

- Agregar Productos: POST api/products

- Consultar Productos: GET api/products

- Eliminar Productos: DELETE apis/products/:productId

- Actualizar Productos: PUT api/products/:productId
