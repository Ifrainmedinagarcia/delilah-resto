#Objetivo:
Crear el backend para un sistema de pedidos online para un restaurante.

#Acciones:
- Registrarnos
- Identificarnos
- Obtener platos
- Agregar platos
- Eliminar pedidos
- Actualizar Platos
- Ver pedido

#API Desing:
- Registrarnos: POST /register
- Identificarnos: POST /login
- Agregar platos: POST /user/order
- Eliminar platos: DELETE /user/order/meals/:id
- Ver pedido: GET /user/order
- Actualizar Platos: PUT /meals (Admin)

