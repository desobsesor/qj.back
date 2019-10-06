var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('CampoDeportivo', {
    nombre: String,
    propietario: { type: Schema.ObjectId, ref: "Persona" },
    descripcion: String,
    horarioDeAtencion: String,
    direccion: {
        departamento: String,
        municipio: String,
        barrio: String,
        calle: String,
        manzana: String,
        numero: String
    },
    fotoPrincipal: { data: Buffer, contentType: String },
    fotoBanner: { data: Buffer, contentType: String },
    administrador: { type: Schema.ObjectId, ref: "Persona" },
    personaRegistro: { type: Schema.ObjectId, ref: "Persona" },
    fechaRegistro: { type: Date, default: Date.now() },
    personaCambio: { type: Schema.ObjectId, ref: "Persona" },
    fechaCambio: { type: Date, default: Date.now() }
});