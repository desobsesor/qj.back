var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Usuario', {
    usuario: {type: String, required: true, trim: true, unique: true},
    nombreCompleto: String,
    documento: {type: String, required: true, trim: true, unique: true},
    passwordHash: {type: String, required: true, trim: true},
    passwordSalt: String,
    persona: {type: Schema.ObjectId, ref: "Persona"},
    activo: Boolean,
    correo: {type: String, required: true, trim: true, unique: true},
    nivelEducativo: {type: Schema.ObjectId, ref: "NivelEducativo"},
    telefono: String,
    direccion: String,
    imagen: String,
    rol: {type: Schema.ObjectId, ref: "Rol"},
    token: String
});
