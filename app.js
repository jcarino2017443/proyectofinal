'use strict'

const express = require("express");
const app = express();
const bodyparser = require("body-parser");

var usuario_rutas = require("./src/rutas/usuario.rutas");
var producto_rutas = require("./src/rutas/productos.rutas");
var categoria_rutas = require("./src/rutas/categoria.ruta")
var pedidoCliente_rutas = require("./src/rutas/pedidoCliente.rutas")

//middleware
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.use('/api', usuario_rutas, producto_rutas, categoria_rutas, pedidoCliente_rutas);

module.exports = app;