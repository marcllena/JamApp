'use strict'
/*
Configuració de express (pk cada cop que es guardi, s'engegi el servidor)
A més indica que utilitzarem la URL api, important el modul creat a rutes
 */

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const api = require('./routes')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/api',api)

module.exports = app
