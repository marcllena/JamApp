'use strict'

/* 
Demana la configuració a config i es conecta a la base de dades
 */
const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');
const socket = require('socket.io');
const websockets = require('./controllers/websockets');
 
mongoose.connect(config.db,(err, res) => {
  if(err) 
  {
    return  console.log('Error al conectar a la base de datos')
  }
  console.log("Conexión a la base de datos establecida")
})
const server = app.listen(config.port, function()  {
  console.log(`API REST corriendo en http://localhost:${config.port}`)
} );
websockets(server);
