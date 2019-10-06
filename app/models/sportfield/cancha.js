var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Cancha', {
    codigo: String,    
    nombre: String,
    descripcion: String,
    observacion: String,
    precioHora: Number,
    dimensiones: { 
        ancho: String, 
        alto: String,
        largo : String
    },    
    encargado: { type: Schema.ObjectId,  ref: "Persona" },
    campoDeportivo: { type: Schema.ObjectId, ref: "CampoDeportivo" },
    tipoCancha: { type: Schema.ObjectId, ref: "TipoCancha" },
    estadoCancha: { type: Schema.ObjectId, ref: "EstadoCancha" },
    personaRegistro: { type: Schema.ObjectId, ref: "Persona" },
    fechaRegistro: { type: Date, default: Date.now() },
    personaCambio: { type: Schema.ObjectId,ref: "Persona" },
    fechaCambio: { type: Date, default: Date.now() },
    fotoPrincipal: { data: Buffer, contentType: String },
    fotoBanner: { data: Buffer, contentType: String }
});