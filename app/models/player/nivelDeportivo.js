var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('NivelDeportivo', {
    id: String,
    nivel: String,
    numeroNivel: Number,
    descripcion: String,
    disciplinaDeportiva: { type: Schema.ObjectId, ref: "DisciplinaDeportiva" },
    personaRegistro: { type: Schema.ObjectId, ref: "Persona" },
    fechaRegistro: { type: Date, default: Date.now() }
});
