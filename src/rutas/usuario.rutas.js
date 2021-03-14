'use strict'

var express = require("express");
var usuarioControlador = require("../controladores/usuarios.controlador");

var md_autorizacion = require("../middlewaress/authenticated");

//RUTAS

var api = express.Router();

api.post('/registrarUsuario', usuarioControlador.resgistrarUsuario);
api.post('/login', usuarioControlador.login);
module.exports = api;
