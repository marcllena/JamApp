'use strict'

/* 
Demana la configuració a config i es conecta a la base de dades
 */
const mongoose = require('mongoose')
const app = require('./app') 
const config = require('./config')

 
mongoose.connect(config.db,(err, res) => {
  if(err) 
  {
    return  console.log('Error al conectar a la base de datos')
  }
  console.log("Conexión a la base de datos establecida")

  app.listen(config.port, () => {
    console.log(`API REST corriendo en http://localhost:${config.port}`)
  } )

})


