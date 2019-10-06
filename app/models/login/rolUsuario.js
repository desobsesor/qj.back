var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('RolUsuario', {
    rol: {
        type: Schema.ObjectId,
        ref: "Rol"
    },
    usuario: {
        type: Schema.ObjectId,
        ref: "Usuario"
    },
    permisos:{
        listaCatalogos: Boolean,
        crearCatalogo: Boolean,
        listarInventarios:Boolean,
        cargarInventario:Boolean,
        puntoDeVenta:Boolean,
        listarVentas:Boolean,
        listarUsuarios: Boolean,
        creaUsuario:Boolean,
        soporte: Boolean
    },
    activo: Boolean,
    personaRegistro: {
        type: Schema.ObjectId,
        ref: "Persona"
    },
    fechaRegistro: {
        type: Date,
        default: Date.now()
    },
    personaCambio: {
        type: Schema.ObjectId,
        ref: "Persona"
    },
    fechaCambio: {
        type: Date,
        default: Date.now()
    }
});

//db.rol.insert(
//    {
//        rol: "",
//        persona: ObjectId("5bae6d3756f173a36704da7f"),
//        activo: true,
//        personaRegistro: ObjectId("5bae6d3756f173a36704da7f"),
//        fechaRegistro: Date.now(),
//        personaCambio: ObjectId("5bae6d3756f173a36704da7f"),
//        fechaCambio: Date.now()
//});