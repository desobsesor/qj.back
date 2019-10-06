var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Fecha', {
    descripcion: String,
    fecha: { 
        type: Date, 
        default: Date.now() 
    },
    horaInicio: String,
    horaFin: String,
    horaApertura: String,
    horaCierre: String,
    campeonato: { 
        type: Schema.ObjectId, 
        ref: "Campeonato" 
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