'use strict'

var express = require("express");
var productoControlador = require("../controladores/productos.controlador");
var md_autorizacion = require("../middlewaress/authenticated");

//RUTAS

var app = express.Router();
app.post('/agregarProducto', md_autorizacion.ensureAuth, productoControlador.crearProducto);
app.put('/editarProducto/:IdProducto', productoControlador.editarProductos);
app.delete('/eliminarProducto/:IdProducto', productoControlador.eliminarProductos);
app.get('/buscarProducto', productoControlador.obtenerProductos);

module.exports = app;