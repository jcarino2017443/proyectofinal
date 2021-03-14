'use strict'

var Categoria = require("../modelos/categoria.modelo");

function agregarCategoria(req, res) {
    var categoriaModel = new Categoria();
    var params = req.body;

    if(params.descripcion){
        categoriaModel.descripcion = params.descripcion;
        categoriaModel.usuario = req.user.sub;
        Categoria.find({
            $or: [
                {descripcion: categoriaModel.descripcion}
            ]
        }).exec((err, descripcionEncontrado)=>{
            if(err) return res.status(500).send({mensaje: "Error en la peticion"});
            if(descripcionEncontrado && descripcionEncontrado.length >=1){
                res.status(401).send({mensaje: "Esta descripcion ya existe"});
            }else{
                categoriaModel.save((err, descripcionGuardad)=>{
                    if(err) return res.status(500).send({mensaje: "Error en la peticion"});
                    if(!descripcionGuardad){
                        return res.status(500).send({mensaje: "No se pudo agregar una descricpion"});
                    }
                    return res.status(200).send({descripcionGuardad});
                })
            }
        })
    }
    
}
function editarCategoria(req, res) {
    var categoriaId = req.params.id;
    var params = req.body;

    Categoria.findByIdAndUpdate(categoriaId, params, {new : true}, (err, editarCat)=>{
        if(err) return res.status(401).send({mensaje: "Error en la peticion"});
        if(!editarCat){
            return res.status(500).send({mensaje: "No se pudo actualizar"});
        }

        return res.status(200).send({editarCat});
    })
    
}
function eliminarCategoria(req, res) {
    var categoriaId = req.params.id;
    var params = req.body;

    Categoria.findByIdAndRemove(categoriaId, (err, categoriaEliminada)=>{
        if(err) return res.status(401).send({mensaje: "Error en la peticion"});
        if(!categoriaEliminada){
            return res.status(500).send({mensaje: "No existe la categoria"});
        }
        return res.status(200).send({mensaje: "categoria Eliminada"});
    })
    
}
function buscarId(req, res) {
    var categoriaId = req.params.id;

    Categoria.findById(categoriaId, (err, idEncontrado)=>{
        if(err) return res.status(401).send({mensaje: "Error en la peticion"});
        if(!idEncontrado){
            res.status(500).send({mensaje: "No hay id"});
        }
        return res.status(200).send({idEncontrado});
    })
    
}
function obtenerCategorias(req, res) {

    Categoria.find({})
    .sort('descripcion')
    .populate('usuario', 'nombre correo')
    .exec((err, obtenerEmpresas)=>{
        if(err) return res.status(500).send({mensaje: "Error en la peticion"});
        if(!obtenerEmpresas){
            res.status(401).send({mensaje: "No hat Empresas"});
        }
        return res.status(200).send({obtenerEmpresas});
    })
    
}

module.exports = {
    agregarCategoria,
    editarCategoria,
    eliminarCategoria,
    obtenerCategorias,
    buscarId
}