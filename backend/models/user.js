'use strict'

const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const config = require('../config');
const Cryptr = require('cryptr');
const cryptr = new Cryptr(config.SECRET_TOKEN);
const crypto = require('crypto')
const baseOptions = {
    discriminatorKey: 'userType',
    collection: 'users'
}

const userBase = new mongoose.Schema({
        //id: String,
        username: String,
        edat: Number,
        email: {type: String, unique: true, lowercase:true},
        password: {type: String,select: false },
        signupDate: {type: Date, default: Date.now() },
        lastlogin: Date},
    baseOptions);

userBase.set('toJSON', {
    //virtuals: true,
    transform: (doc, ret, options) => {
        delete ret.__v;
        ret._id = cryptr.encrypt(ret._id);
    },
});

userBase.pre('save',function(next) {
    let user=this;
    if(!user.isModified('password'))
        return next()
    bcrypt.genSalt(10,(err,salt) => {
        if(err)
            return next(err);

        bcrypt.hash(user.password,salt,null,(err,hash) => {
            if(err)
                return next(err);

            user.password= hash;
            next()
        })
    })

});

userBase.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

userBase.methods.gravatar = function () {
    if(!this.email)
        return'https://gravatar.com/avatar/?s=200&d=retro';

    const md5 = crypto.createHash('md5').update(this.email).digest('hex');
    return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
};
module.exports = mongoose.model('User',userBase);
