DELILAH RESTÓ

#Objetivo:
Crear el backend para un sistema de pedidos online para un restaurante.

#Acciones User:
- Registrarnos
- Identificarnos
- Crear Órdenes
- Obtener solo sus Órdenes
- Obtener todo el catálogo de Platos disponibles
----------------------------------------------------------------------------------------------------------

#Acciones Admin:
- Obtener Platos
- Agregar Platos
- Eliminar Platos
- Actualizar Platos
- Obtener todas las Órdenes
- Eliminar Órdenes
- Actualizar status de las Órdenes
- Crear Órdenes
- Actualizar role de Usuarios
- Agregar un nuevo Usuario
- Eliminar Usuarios
- Obtener todos los Usuarios
----------------------------------------------------------------------------------------------------------

1. Clonar el proyecto desde tu consola 🚀

copia y pega esta línea de comando:

```
git clone https://github.com/Ifrainmedinagarcia/delilah-resto.git
```

----------------------------------------------------------------------------------------------------------

2. Instalar dependencia 🔧

copia y pega esta línea de comando:

```
npm i
```

----------------------------------------------------------------------------------------------------------

3. Crear Base de Datos ⚙️

Al clonar el proyecto hay un archivo llamado db.slq ahí están 
todas las instrucciones para la creación las tablas que debes 
crear para poder iniciar el servidor con la base de datos. 
También se encuentran la creación de las FOREIGN KEY para 
hacer la relación entre las tablas.

----------------------------------------------------------------------------------------------------------

4. Crear archivo .env 🖇️

Debes crear un archivo .env para guardar las variables de entornos:

- TOKEN_SECRET
- EXPIRES

Debe estar escrito tal cual como se muestra en este documento.

- TOKEN_SECRET (es el token que se necesita para generar y decodificar 
el token de cada usuario y así poder hacer las diferentes acciones, 
recuerda que este token debe estar en una variable de entorno y el string debe estar oculto)

- EXPIRES (es el tiempo de validez que tendrá el token 
del usuario para hacer operaciones).

----------------------------------------------------------------------------------------------------------

5. Inicia el servidor 🚀

Tienes varias opciones para iniciar el servidor. Desde tu terminal o editor de código(en la consola) y estando en la carpeta delilah-resto puedes introducir cualquiera de estos comandos:

```
node app.js
nodemon app.js
npm start
```

----------------------------------------------------------------------------------------------------------

6. Puedes ir a swagger copiar y pegar el contenido del archivo YAML para entender mejor el funcionamiento de la API

----------------------------------------------------------------------------------------------------------

7. EDPOINT ✒️

#API Desing:

| Metodo  | Enpoint                | Body                                                     | Header  | Descripcion                        |
|---------|------------------------|----------------------------------------------------------|---------|------------------------------------|
| USERS   |                        |                                                          |         |                                    |
|         |                        |                                                          |         |                                    |
| POST    | api/auth/register      |{email, contrasena}                                       |         | Registra un usuario nuevo          |
| POST    | api/auth/login         |{nombre_user, email, phone, address, contrasena, id_role} |         | Inicio de sesión del usuario       |
| GET     | api/users              |                                                          | {TOKEN} | Obtiene todos los usuarios (Admin) |
| POST    | api/users              |{nombre_user, email, phone, address, contrasena, id_role} | {TOKEN} | Crear un nuevo usuario (Admin)     |
| GET     | api/users/:userId      |                                                          | {TOKEN} | Obtiene usuario por su ID (Admin)  |
| PUT     | api/users/:userId      |{id_role}                                                 | {TOKEN} | Actualiza rol del usuario (Admin)  |
| DELETE  | api/users/:userId      |{mealsID} (por parámetro)                                 | {TOKEN} | Elimina Usuario (Admin)            |
|         |                        |                                                          |         |                                    |
| MEALS   |                        |                                                          |         |                                    |
|         |                        |                                                          |         |                                    |
| POST    | api/meals              |{nombre_meal, precio, img}                                | {TOKEN} | Crea un plato (Admin)              |
| GET     | api/meals              |                                                          |         | Devuelve todos los platos          |
| GET     | api/meals/:mealsId     |                                                          |         | Devuelve un plato según su ID      |
| PUT     | api/meals/:mealsId     |{nombre_meal, precio, img}                                | {TOKEN} | Actualiza un plato (Admin)         |
| DELETE  | api/meals/:mealsId     |{mealsID} (por parámetro)                                 | {TOKEN} | Elimina un plato (Admin)           |
|         |                        |                                                          |         |                                    |
| ORDERS  |                        |                                                          |         |                                    |
|         |                        |                                                          |         |                                    |
| POST    | api/orders             |{id_user, id_meal, id_forma_pago, id_status}              | {TOKEN} | Crea una nueva orden               |
| GET     | api/orders             |                                                          | {TOKEN} | Obtiene todas las órdenes (Admin)  |
| GET     | api/orders/user        |                                                          | {TOKEN} | Obtiene las órdener del usuario    |
| PUT     | api/orders/:orderId    |{orderId} (por parámetro)                                 | {TOKEN} | Actualiza status orden (Admin)     |
| DELETE  | api/orders/:orderId    |{orderId} (por parámetro)                                 | {TOKEN} | Elimina la orden (Admin)           |

