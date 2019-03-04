'use scrict'
/*
Esquema de la base de dades amb els camps que pot tindre cada Usuari  
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const UserSchema = Schema({
    username: String,
    edat: Number,
    email: {type: String, unique: true, lowercase:true},
    password: {type: String,select: false },
    fotoPerfil: String,
    instrument:[String],
    ubicacio:String,
    coordenades:[Number],
    descripcio:String,
    video:String,
    estils:[String],
    signupDate: {type: Date, default: Date.now() },
    lastlogin: Date
})

UserSchema.pre('save',function(next) {  
    let user=this;
    if(!user.isModified('password'))
        return next()
    bcrypt.genSalt(10,(err,salt) => {
        if(err)
            return next(err);

        bcrypt.hash(user.password,salt,null,(err,hash) => {
            if(err)
                return next(err);

            user.password= hash
            next()
        })
    })

})

UserSchema.methods.gravatar = function () {
    if(!this.email)
        return'https://gravatar.com/avatar/?s=200&d=retro'

    const md5 = crypto.createHash('md5').update(this.email).digest('hex')
    return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
}

module.exports= mongoose.model('User',UserSchema)
