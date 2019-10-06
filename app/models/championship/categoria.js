var mongoose = require('mongoose');
/**
 * categoria creada unicamente para el campeonato.
 */
module.exports = mongoose.model('Categoria', {
    categoria: String,
    codigo: String,
    descripcion: String,
    campeonato: { 
        type: Schema.ObjectId, 
        ref: "Campeonato" 
    }
});