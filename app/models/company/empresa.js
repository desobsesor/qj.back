var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Empresa', {
    empresa: String,
    nit: String,
    codigo: String,
    descripcion: String,
    logo: String,
    bannerPrincipal: String,
    url:String,
    direccion: {
        departamento: String,//{ type: Schema.ObjectId, ref: "Departamento" },
        municipio: String,//{ type: Schema.ObjectId, ref: "Municipio" },
        barrio: String,//{ type: Schema.ObjectId, ref: "Barrio" },
        calle: String,
        manzana: String,
        numero: String
    },
    contacto: {
        blog: String,
        correoElectronico: String,
        telefonoFijo: String,
        telefonoCelular: String,
        notaContacto1: String,
        notaContacto2: String,
        notaContacto3: String
    },
    pagoAlDia:{
        estado:Boolean,
        mensaje:String
    },
    personaRegistro: {type: Schema.ObjectId,ref: "Persona"},
    fechaRegistro: { type: Date, default: Date.now() }
});