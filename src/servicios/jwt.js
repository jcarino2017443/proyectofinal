'use strict'

var jwt = require("jwt-simple");
var momment = require("moment");
var secret = 'clave_secreta_IN6AV';

exports.createToken = function(usuario){
    var payload = {
        sub: usuario._id,
        nombre: usuario.nombre,
        username: usuario.username,
        password: usuario.password,
        correo: usuario.correo,
        rol: usuario.rol,
        iat: momment().unix(),
        exp: momment().days(15, 'days').unix()
    }

    return jwt.encode(payload, secret);

}