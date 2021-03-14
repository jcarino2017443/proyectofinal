'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var usuarioSchema = Schema ({
    nombre: String,
    username: String,
    password: String,
    correo: String,
    rol: String,
})

module.exports = mongoose.model('usuarios', usuarioSchema);