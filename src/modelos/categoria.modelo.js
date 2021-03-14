'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var categoriaSchema = Schema({
    descripcion: {type: String, unique: true, required: [true, 'la descipcion es obligatoria']},
    usuario: {type: Schema.Types.ObjectId, ref: 'usuarios'}
})

module.exports = mongoose.model("categorias", categoriaSchema);