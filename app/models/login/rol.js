var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Rol', {
    rol: String,
    descripcion: String,
    activo: Boolean,
    personaRegistro: {
        type: Schema.ObjectId,
        ref: "Persona"
    },
    fechaRegistro: {
        type: Date,
        default: Date.now()
    }
});

//db.rol.insert(
//    {
//        rol: "ADMINISTRADOR",
//        descripcion: "Administrador general de la base de datos",
//        activo: true,
//        personaRegistro: ObjectId("5bae6d3756f173a36704da7f"),
//        fechaRegistro: Date.now(),
//});

//db.rol.insert(
//    {
//        rol: "JUGADOR",
//        descripcion: "Jugador, actor principal del servicio",
//        activo: true,
//        personaRegistro: ObjectId("5bae6d3756f173a36704da7f"),
//        fechaRegistro: Date.now(),
//});