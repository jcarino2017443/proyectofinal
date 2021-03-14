'use strict'

var express = require("express");
var pedidoCliente = require("../controladores/pedidoCliente.controlador");
var md_autorizacion = require("../middlewaress/authenticated");


var app = express.Router();
app.post('/pedido', md_autorizacion.ensureAuth, pedidoCliente.hacerPedido);
app.put('/editarPedido/:id', md_autorizacion.ensureAuth, pedidoCliente.editarPedido);
app.delete('eliminarPedido/:id', md_autorizacion.ensureAuth, pedidoCliente.eliminarPedido);
app.get('/obtenerPedidos', md_autorizacion.ensureAuth, pedidoCliente.obtenerPedidos);


module.exports = app;