'use strict'

var moongoose = require("mongoose");
var Schema = moongoose.Schema;

var categotiaSchema = Schema({
    nombre: {type: String, required: [true, 'El nombre es necesario']},
    precioUni: {type: Number, required: [true, 'El precio es necesario']},
    descripcion: {type: String, required: false},
    disponible: {type: Boolean, required: true, default: true},
    categoria: {type: Schema.Types.ObjectId, ref: 'categorias', required:true},
    usuario: {type: Schema.Types.ObjectId, ref: 'usuarios'}
})

module.exports = moongoose.model('productos', categotiaSchema);