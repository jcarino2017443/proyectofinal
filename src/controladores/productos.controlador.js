'use strict'

var Productos = require("../modelos/producto.modelo");

function crearProducto(req, res) {
    var productoModel = new Productos();
    var params = req.body;

    if(params.nombre && params.precioUni && params.categoria){
        productoModel.usuario = req.user.sub;
        productoModel.nombre = params.nombre;
        productoModel.precioUni = params.precioUni;
        productoModel.descripcion = params.descripcion;
        productoModel.disponible = params.disponible;
        productoModel.categoria = params.categoria;
        

        Productos.find({
            $or: [
                {nombre: productoModel.nombre}
            ]
        }).exec((err, productoEncontrado)=>{
            if(err) return res.status('error en l apeticion');
            if(productoEncontrado && productoEncontrado.length >=1){
                res.status(401).send({mensaje: "El producto ya existe"});
            }else{
                productoModel.save((err, productoGuardado)=>{
                    if(err) return res.status(500).send({mensaje: "Error"});
                    if(!productoGuardado){
                        return res.status(500).send({mensaje: "No hay datos"});
                    }
                    return res.status(200).send({productoGuardado});
                })
            }
        })

    }
    
}
function editarProductos(req, res) {
    var productoId = req.params.IdProducto;
    var params = req.body;
    var productoModel = new Productos();

    if(params.nombre){
        productoModel.nombre = params.nombre;
        Productos.find({
            $or: [{nombre: productoModel.nombre}]
        }).exec((err, productoEncontrado)=>{
            if(err) return res.status(500).send({mensaje: 'Error en la peticcion'});
            if(productoEncontrado && productoEncontrado.length >=1){
                return res.status(500).send({mensaje: 'El producto ya existe'});
            }else{
                Productos.findByIdAndUpdate(productoId, params, {new:true}, (err, actualizarProducto)=>{
                    if(err) return res.status(500).send({mensaje: 'Error'});
                    if(!actualizarProducto){
                        return res.status(500).send({mensaje: 'Error al editar'});
                    }
                        return res.status(200).send({actualizarProducto});
                })                
            }
        })
    }else{
        return res.status(401).send({mensaje: "solo el nombre puede editarse"})
    }  
}
function eliminarProductos(req, res) {
    var productoId = req.params.IdProducto;
    
    Productos.findByIdAndDelete(productoId, (err, productoEliminado)=>{
        if(err) return res.status(500).send({mensaje: "Error en la peticion Productos"});
        if(!productoEliminado) {
            return res.status(401).send({mensaje: "No se podu eliminar, no existe"});
        }

        return res.status(200).send({mensaje: "producto eliminado"})
    })
    
}
function obtenerProductos(req, res) {
    Productos.find()
    .populate('categoria', 'descripcion')
    .exec((err, productoEncontrado)=>{
        if(err) return res.status(500).send({mensaje: "Error en la peticion"});
        if(!productoEncontrado) {
            res.status(500).send({mensaje: "No hay ningun producto"});
        }

        return res.status(200).send({productoEncontrado})
    })
    
}

module.exports = {
    crearProducto,
    editarProductos,
    eliminarProductos,
    obtenerProductos
}
