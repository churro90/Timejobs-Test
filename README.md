# Timejobs-Test by Martín Carrasco

Despues de clonar el repositorio instalar dependencias usando npm install.

Para obtener la temperatura de una ciudad se debe ingresar a localhost:5000/temperature?city={nombre de la ciudad}

Estructura del proyecto:
* middleware (middleware para manejar los tiempos de respuesta de la API)
* models (modelo para almacenar la temperatura en la BBDD)
* services (Clase abstracta para manejar la lógica)
* server.js (entry point que consta de 1 solo endpoint /temperature)

Algunas consideraciones: 

1. Es una práctica totalmente no recomendable pero se pusheo el archivo .env al repositorio para las variables de ambiente.
2. De la misma forma, también se whitelisteo cualquier IP para poder conectarse a la BBDD.
3. Se uso mongoose como ODM.
