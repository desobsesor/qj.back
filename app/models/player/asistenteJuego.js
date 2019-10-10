var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('AsistenteJuego', {
    disciplinaDeportiva: {type: Schema.ObjectId, ref: "DisciplinaDeportiva"},
    fecha: {type: Date, default: Date.now()},
    todosLosCamposDeportivos: Boolean, //todos los campos deportivos que tiene configurados en su perfil
    campoDeportivoEspecifico: {type: Schema.ObjectId, ref: "CampoDeportivo"},
    nivelDeportivoSolicitado: {type: Schema.ObjectId, ref: "NivelDeportivo"}, //Se toma de su perfil para sugerir, puede que se quiere participar en otro nivel
    posicionSolicitada: {type: Schema.ObjectId, ref: "Posicion"}, //Se toma de su perfil para sugerir, puede que se quiere participar en otra posicion durante el juego planeado
    personaRegistro: {type: Schema.ObjectId, ref: "Persona"},
    fechaRegistro: {type: Date, default: Date.now()}
});


db.disciplinadeportivas.insert(
    {
        id: "2",
        nombre: "FUTBOL",
        descripcion: "Futbol (Futbol Soccer,)",
        tiempoDeJuego: 90,
        periodosDeJuego: 2,
        valorTiempoDescanso: 15,
        numeroJugadoresPorEquipo: 11,
        personaRegistro: ObjectId("5bae6d3756f173a36704da7f"),
        fechaRegistro: Date.now(),
        fotoPrincipal: "",
        fotoBanner: "",
    });
