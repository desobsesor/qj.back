var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Posicion', {
    id: String,
    posicion: String,
    numeroPosicion: Number,
    descripcion: String,
    disciplinaDeportiva: { type: Schema.ObjectId, ref: "DisciplinaDeportiva" },
    personaRegistro: { type: Schema.ObjectId, ref: "Persona" },
    fechaRegistro: { type: Date, default: Date.now() }
});
