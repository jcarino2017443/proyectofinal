'use strict'

var Usuario = require("../modelos/usuario.modelo");
var bycript = require("bcrypt-nodejs");
var jwt = require("../servicios/jwt");


function login(req, res) {
    var params = req.body;

    Usuario.findOne({correo: params.correo}, (err, correoEncontrado)=>{
        if(err) return res.status(500).send({mensaje: 'error en la peticion'});

        if(correoEncontrado){
            bycript.compare(params.password, correoEncontrado.password,(err, passVerificada)=>{
                if(passVerificada){
                    if(params.getToken === 'true'){
                        return res.status(200).send({token: jwt.createToken(correoEncontrado)});
                    }else{
                        correoEncontrado.password = undefined;
                            return res.status(200).send({correoEncontrado});
                    }
                }else{
                    return res.status(500).send({mensaje: 'error al buscar el usuario'});
                }
            })
        }
    })
}
function resgistrarUsuario(req, res) {
    var usuarioModel = new Usuario();
    var params = req.body;

    if(params.correo && params.username && params.password){
        usuarioModel.nombre = params.nombre;
        usuarioModel.username = params.username;
        usuarioModel.correo = params.correo;
        usuarioModel.rol = "Rol_Admin"
        Usuario.find({
            $or:[
                {correo: usuarioModel.correo},
                {username: usuarioModel.username}
            ]
        }).exec((err, usuarioEncotrado)=>{
            if(err) return res.status(404).send({mesaje: 'Error al realizar la peticion admin'});
            if(usuarioEncotrado && usuarioEncotrado.length >= 1){
                return res.status(401).send({mensaje: "El usuario ya existe"})
            }else{
                bycript.hash(params.password, null, null, (err, passwordEncontrada)=>{
                    usuarioModel.password =  passwordEncontrada;
                    usuarioModel.save((err, usuarioGuardado)=>{
                        if(err) return res.status(500).send({mensaje: 'error en la peticion de guardar usuario'});
                        if(usuarioGuardado){
                            res.status(200).send({usuarioGuardado});
                        }else{
                            res.status(404).send({mensaje: 'no se ha podido registar el usuario'});
                        }
                    })
                })
            }
        })

    }
    
}

module.exports = {
    resgistrarUsuario,
    login
}