var NivelDeportivo = require('../../models/player/nivelDeportivo');

exports.getNivelesDeportivos = function (req, res) {
    /*res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header("Access-Control-Allow-Headers", "content-type, Authorization, Content-Length, X-Requested-With, Origin, Accept");*/
    NivelDeportivo.find(
        function (err, nivelDeportivo) {
            if (err) {
                res.send(err);
            }
            res.json(nivelDeportivo);
        }
    ).populate('personaRegistro')
        .populate('disciplinaDeportiva');
}

exports.setDisciplinaDeportiva = function (req, res) {
    DisciplinaDeportiva.create({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            tiempoDeJuego: req.body.tiempoDeJuego,
            periodosDeJuego: req.body.periodosDeJuego,
            valorTiempoDescanso: req.body.valorTiempoDescanso,
            numeroJugadoresPorEquipo: req.body.numeroJugadoresPorEquipo,
            personaRegistro: "5bae6d3756f173a36704da7f",
            fechaRegistro: Date.now(),
            fotoPrincipal: req.body.fotoPrincipal,
            fotoBanner: req.body.fotoBanner,
    },
        function (err, disciplinaDeportiva) {
            if (err) {
                res.send(err);
            }
            Usuario.find({ _id: usuario._id },
                function (err_, newDisciplinaDeportiva_) {
                    if (err_) {
                        return next(err_);
                    }
                    res.json(newDisciplinaDeportiva_);
                }).populate('persona');
        });
};

