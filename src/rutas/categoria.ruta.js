'use strict'
var express = require("express");
var categoriaControlador = require("../controladores/categoria.controlador");
var md_autorizacion = require("../middlewaress/authenticated");

var app = express.Router();
app.post('/agregarCategorias', md_autorizacion.ensureAuth, categoriaControlador.agregarCategoria),
app.put('/editarCategorias/:id', md_autorizacion.ensureAuth, categoriaControlador.editarCategoria);
app.delete('/eliminarCategoria/:id', md_autorizacion.ensureAuth, categoriaControlador.eliminarCategoria)
app.get('/obtenerCategoriaId/:id', categoriaControlador.buscarId);
app.get('/obtenerCategorias', categoriaControlador.obtenerCategorias);

module.exports = app;