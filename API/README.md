# Blog API

Instalacion

- express
- mongoose

- User: {
  "name": "Nombre del Usuario",
  "email": "correo@ejemplo.com",
  "password": "contraseñaSegura"
  }

- Review: {
  "restaurant": "ID_del_Restaurante",
  "user": "ID_del_Usuario",
  "rating": 8,
  "comment": "Este restaurante es increíble."
  }

-Restaurant:
{
"nombre": "Nombre del Restaurante",
"ubicacion": "Ubicación del Restaurante",
"horarios": "Horarios del Restaurante",
"menu": [
{
"nombre": "Plato 1",
"descripcion": "Descripción del Plato 1",
"precio": 10.99
},
{
"nombre": "Plato 2",
"descripcion": "Descripción del Plato 2",
"precio": 15.99
}
],
"reservas": [],
"reviews": []
}

-Reserva:
{
"restaurante": "ID_del_Restaurante",
"usuario": "ID_del_Usuario",
"fecha": "2023-10-13", // Fecha en formato ISO 8601
"hora": "19:00" // Hora en formato HH:mm
}
