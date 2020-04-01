var CampoDeportivo = require('../../models/sportfield/campoDeportivo');

exports.getCamposDeportivos = function (req, res) {
   /*
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header("Access-Control-Allow-Headers", "content-type, Authorization, Content-Length, X-Requested-With, Origin, Accept");
*/
    CampoDeportivo.find(
        function (err, campoDeportivo) {
            if (err) {
                res.send(err);
            }
            res.json(campoDeportivo);
        }
    ).populate('propietario');
}

exports.setCampoDeportivo = function (req, res) {
    CampoDeportivo.create({
            nombre: req.body.nombre,
            propietario: req.body.propietario,
            descripcion: req.body.descripcion,
            horarioDeAtencion: req.body.horarioDeAtencion,
            direccion: {
                departamento: req.body.departamento,
                municipio: req.body.municipio,
                barrio: req.body.barrio,
                calle: req.body.calle,
                manzana: req.body.manzana,
                numero: req.body.numero
            },
            fotoPrincipal: req.body.fotoPrincipal,
            fotoBanner: req.body.fotoBanner,
            administrador: "5bae6d3756f173a36704da7f",
            personaRegistro: "5bae6d3756f173a36704da7f",
            fechaRegistro: Date.now(),
            clase: req.body.clase,
            icono: req.body.icono
    },
        function (err, campoDeportivo) {
            if (err) {
                res.send(err);
            }
            CampoDeportivo.find({ _id: campoDeportivo._id },
                function (err_, newCampoDeportivo_) {
                    if (err_) {
                        return next(err_);
                    }
                    res.json(newCampoDeportivo_);
                }).populate('propietario')
                .populate('administrador');
        });
};

