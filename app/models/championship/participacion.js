var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Participacion', {
    nombre: String,
    descripcion: String,
    tiempoDeJuego: String,
    campeonato: { 
        type: Schema.ObjectId, 
        ref: "Campeonato" 
    },
    disciplinaDeportiva: { 
        type: Schema.ObjectId, 
        ref: "DisciplinaDeportiva" 
    },
    partida: { 
        type: Schema.ObjectId, 
        ref: "Partida" 
    },    
    posiciones: { 
        primerInstancia: Schema.ObjectId, 
        segundaInstancia: String 
    },
//#region CAMPOS ESENCIALES EN EL MODELO
    imagenPrincipal: { 
        data: Buffer, 
        contentType: String 
    },
    archivoPrincipal: { 
        data: Buffer, 
        contentType: String 
    },
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
    //#endregion FIN CAMPOS ESENCIALES
});