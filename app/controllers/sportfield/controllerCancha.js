var Cancha = require('../../models/sportfield/cancha');

exports.getCanchasPorCampoDeportivo = function (req, res) {
    console.log("req.params.campoDeportivo:" + req.params.campoDeportivo);
    Cancha.find({campoDeportivo: req.params.campoDeportivo},
        function (err, cancha) {
            if (err) {
                res.send(err);
            }
            res.json(cancha);
        }
    ).populate('encargado')
        .populate('campoDeportivo')
        .populate('tipo')
        .populate('estado');
};

exports.getCanchasEnListaPaginada = function (req, res) {
    Cancha.find(
        function (err, cancha) {
            if (err) {
                res.send(err);
            }
            res.json(cancha);
        }
    ).populate('encargado')
        .populate('campoDeportivo')
        .populate('tipo')
        .populate('estado').skip(parseInt(req.params.page) - 1).limit(parseInt(req.params.rows));
};

exports.getCancha = function (req, res) {
    Cancha.find(
        function (err, cancha) {
            if (err) {
                res.send(err);
            }
            res.json(cancha);
        }
    ).populate('encargado')
        .populate('tipoCancha')
        .populate('estadoCancha')
        .populate('campoDeportivo');
};

exports.setCancha = function (req, res) {
    Cancha.create(
        {
            id: req.body.id,
            numero: req.body.numero,
            cancha: req.body.cancha,
            documentoCliente: req.body.numero,
            cliente: req.body.cliente,
            fecha: Date.now(),
            horaInicio: req.body.horaInicio,
            horaFin: req.body.horaFin,
            direccionDespacho: req.body.direccionDespacho,
            subtotal: req.body.subtotal,
            total: req.body.total,
            descuentos: {
                porcentaje: req.body.descuentos.porcentaje,
                total: req.body.descuentos.total,
            },
            anulado: req.body.anulado,
            pagado: req.body.pagado,
            credito: req.body.credito,
            cajaControl: req.body.cajaControl,
            observaciones: req.body.observaciones,
            personaRegistro: req.body.personaRegistro,
            fechaRegistro: Date.now(),
            personaCambio: req.body.personaCambio,
            fechaCambio: Date.now(),
        },
        function (err, cancha) {
            if (err) {
                res.send(err);
            }
            Cancha.find(function (err_, cancha_) {
                if (err_) {
                    res.send(err_);
                }
                res.json(cancha_);

            }).populate('cancha')
                .populate('cliente');
        });
};

exports.updateEstadoCancha = function (req, res) {
    Cancha.update({_id: req.body.idCancha},
        {$set: {estadoCancha: req.body.idEstado}},
        function (err, cancha) {
            if (err) {
                res.send(err);
            }
            Cancha.find(function (err_, cancha_) {
                if (err_) {
                    res.send(err_);
                }
                res.json(cancha_);
            }).populate('cancha')
                .populate('cliente');
        });
};

exports.updateImagenCancha = function (req, res) {
    Cancha.update({_id: req.params.jugador_id},
        {$set: {imagen: req.params.jugador_imagen}},
        function (err, cancha) {
            if (err) {
                res.send(err);
            }
            Cancha.find(function (err_, cancha_) {
                if (err_) {
                    res.send(err_);
                }
                res.json(cancha_);
            }).populate('cancha')
                .populate('cliente');
        });
};

exports.updateCancha = function (req, res) {
    Cancha.update({_id: req.params.jugador_id},
        {
            $set: {
                id: req.body.id,
                numero: req.body.numero,
                cancha: req.body.cancha,
                documentoCliente: req.body.numero,
                cliente: req.body.cliente,
                fecha: Date.now(),
                horaInicio: req.body.horaInicio,
                horaFin: req.body.horaFin,
                direccionDespacho: req.body.direccionDespacho,
                subtotal: req.body.subtotal,
                total: req.body.total,
                descuentos: {
                    porcentaje: req.body.descuentos.porcentaje,
                    total: req.body.descuentos.total,
                },
                anulado: req.body.anulado,
                pagado: req.body.pagado,
                credito: req.body.credito,
                cajaControl: req.body.cajaControl,
                observaciones: req.body.observaciones,
                personaRegistro: req.body.personaRegistro,
                fechaRegistro: Date.now(),
                personaCambio: req.body.personaCambio,
                fechaCambio: Date.now(),
            }
        },
        function (err, cancha) {
            if (err) {
                res.send(err);
            }
            Cancha.find(function (err_, cancha_) {
                if (err_) {
                    res.send(err_);
                }
                res.json(cancha_);
            }).populate('cancha')
                .populate('cliente');
        });
};

exports.removeCancha = function (req, res) {
    Cancha.remove({_id: req.params.jugador_id}, function (err, cancha) {
        if (err) {
            res.send(err);
        }
        Cancha.find(function (err_, cancha_) {
            if (err_) {
                res.send(err_);
            }
            res.json(cancha_);
        }).populate('encargado')
            .populate('campoDeportivo')
            .populate('tipo')
            .populate('estado');
    });
};
