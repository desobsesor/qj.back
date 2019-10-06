var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('TipoCancha', {
    tipoCancha: String,
    descripcion: String,
    disciplinaDeportiva: { type: Schema.ObjectId, ref: "DisciplinaDeportiva" },
    personaRegistro: { type: Schema.ObjectId, ref: "Persona" },
    fechaRegistro: { type: Date, default: Date.now() },
    personaCambio: { type: Schema.ObjectId,ref: "Persona" },
    fechaCambio: { type: Date, default: Date.now() }
});