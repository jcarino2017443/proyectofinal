'use strict'

const mongoose = require("mongoose");
const app = require("./app");

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/VentaOnline', {useNewUrlParser: true, useUnifiedTopology:true}).then(()=>{
    console.log("La base de datos esta corriendo")

    app.listen(80, function(){
        console.log("Servidor  Corriendo en el puerto 80")
    })

}).catch(err => console.log(err))