var DisciplinaDeportiva = require('../../models/player/disciplinaDeportiva');

exports.getDisciplinasDeportivas = function (req, res) {
    DisciplinaDeportiva.find(
        function (err, disciplinaDeportiva) {
            if (err) {
                res.send(err);
            }
/*
            res.header("Access-Control-Allow-Origin", "*");
            res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST, OPTIONS');
            res.header("Access-Control-Allow-Headers", "content-type, Authorization, Content-Length, X-Requested-With, Origin, Accept");
*/
            console.log('cargando disciplinas deportivas en el backend!' , disciplinaDeportiva);
            res.json(disciplinaDeportiva);
        }
    ).populate('personaRegistro');
}

exports.setDisciplinaDeportiva = function (req, res) {
    DisciplinaDeportiva.create({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            tiempoDeJuego: req.body.tiempoDeJuego,
            periodosDeJuego: req.body.periodosDeJuego,
            valorTiempoDescanso: req.body.valorTiempoDescanso,
            numeroJugadoresPorEquipo: req.body.numeroJugadoresPorEquipo,
            personaRegistro: "5bdf5f9bab2f133c2820a66e",
            fechaRegistro: Date.now(),
            fotoPrincipal: req.body.fotoPrincipal,
            fotoBanner: req.body.fotoBanner,
        },
        function (err, disciplinaDeportiva) {
            if (err) {
                res.send(err);
            }
            Usuario.find({_id: usuario._id},
                function (err_, newDisciplinaDeportiva_) {
                    if (err_) {
                        return next(err_);
                    }
                    res.json(newDisciplinaDeportiva_);

                }).populate('persona');
        });
};

