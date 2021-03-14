'use strict'
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var clienteSchema = Schema = {
    cantidad: {type: Number, default: 1},
    cliente: {type: Schema.Types.ObjectId, ref: 'usuarios'},
    producto: {type: Schema.Types.ObjectId, ref: 'productos', required:true}
}
module.exports = mongoose.model('cliente', clienteSchema);