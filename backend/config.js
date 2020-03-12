/*
Guarda la configuració, com el Port o la URL de la base de dades  
 */
module.exports={
    port: process.env.PORT || 3000,
    //db: process.env.MONGODB ||  'mongodb://database:27017/jamapp',
    db: process.env.MONGODB ||  'mongodb://localhost:27017/jamapp',
    SECRET_TOKEN: 'Your_Secret_Key'
}
