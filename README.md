para que funcione el proyecto por ahora hay que tener una conexion con el nombre root y contraseña root, tambien hay que tener la base de datos creada en mysql con el nombre moneymate y la tabla dentro que se llame usuarios con los campos, nombre, correo, etc...,
ademas una vez se clone hay que en la consola del proyecto instalar las dependencias con npm install, eso instala todo lo que se necesita, claramente primero hay que tener descargado en el equipo node.js 
y se ejecuta el proyecto desde consola con npm start, ademas se abre la pagina en localhost:3000 

realice cambios a la clase server.js tendran que intalar esto (npm install dotenv bcrypt express-validator)
y se creo el archico conexionbd para traer los datos de la bd a partir de un documento