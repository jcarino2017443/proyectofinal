'use strict'

var Pedido = require('../modelos/pedidoCliente.modelo');

function hacerPedido(req, res) {
 var pedidoModel = new Pedido();
 var params = req.body;

 if(params.cantidad && params.producto){
     pedidoModel.cantidad = params.cantidad;
     pedidoModel.cliente = req.user.sub;
     pedidoModel.producto = params.producto;
    
            pedidoModel.save((err, pedidoGuardado)=>{
                if(err) return res.status(500).send({mensaje: "error en la peticion"});
                if(!pedidoGuardado){
                    return res.status(500).send({mensaje: "no se pudo guuardar"});
                }
                return res.status(200).send({pedidoGuardado});
                
            })    
     
 }else{
     return res.status(500).send({mensaje: "Necesita los campos correctos"})
 }
}
function editarPedido(req, res) {
    var params = req.body;
    var clienteId = req.params.id;
    
    Pedido.findByIdAndUpdate(clienteId, params, (err, editar)=>{
        if(err) return res.status(500).send({mensaje: "error en la peticion"});
        if(!editar){
            return res.status(500).send({mensaje: "no se pudo guuardar"});
        }
        return res.status(200).send({editar});
    })
}
function eliminarPedido(req, res) {
    var clienteId = req.params.id;

    Pedido.findByIdAndRemove(clienteId, (err, eliminar)=>{
        if(err) return res.status(500).send({mensaje: "error en la peticion"});
        if(!eliminar){
            return res.status(500).send({mensaje: "no se pudo eliminar"});
        }
        return res.status(200).send({mensaje: "Se elimino"});
    })
    
}
function obtenerPedidos(req, res) {
    Pedido.find()
    .populate('producto', 'nombre')
    .populate('cliente', 'nombre')
    .exec((err, mostrarPedidos)=>{
        if(err) return res.status(500).send({mensaje: "Error en la peticino"});
        if(!mostrarPedidos){
            return res.status(500).send({mensaje: "Error no hay pedidos"});
        }
        return res.status(200).send({mostrarPedidos});
    })
}

module.exports = {
    hacerPedido,
    editarPedido,
    eliminarPedido,
    obtenerPedidos

}