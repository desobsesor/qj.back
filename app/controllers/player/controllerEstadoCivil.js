var EstadoCivil = require('../../models/player/personalInformation/estadoCivil');

exports.getEstadosCiviles = function (req, res) {
    EstadoCivil.find({estadoCivil: req.params.estadoCivil, passwordHash: req.params.password},
        function (err, estadoCivil) {
            if (err) {
                res.send(err);
            }
            res.json(estadoCivil);
        }
    );
};

exports.getEstadoCivil = function (req, res) {
    EstadoCivil.find(
        function (err, estadoCivil) {
            if (err) {
                res.send(err);
            }
            res.json(estadoCivil);
        }
    );
};

exports.setEstadoCivil = function (req, res) {
    EstadoCivil.create(
        {
            estadoCivil: req.body.estadoCivil,
            codigo: req.body.codigo,
            descripcion: req.body.descripcion
        },
        function (err, estadoCivil) {
            if (err) {
                res.send(err);
            }
            EstadoCivil.find(function (err_, estadoCivil_) {
                if (err_) {
                    res.send(err_);
                }
                res.json(estadoCivil_);
            });
        });
};

exports.updateImagenEstadoCivil = function (req, res) {
    EstadoCivil.update({_id: req.params.tipoDocumento_id},
        {$set: {imagen: req.params.tipoDocumento_imagen}},
        function (err, estadoCivil) {
            if (err) {
                console.log(err);
                res.send(err);
            }
            EstadoCivil.find(function (err_, estadoCivil_) {
                if (err_) {
                    res.send(err_);
                }
                res.json(estadoCivil_);
            });
        });
};

exports.updateEstadoCivil = function (req, res) {
    EstadoCivil.update({_id: req.params.tipoDocumento_id},
        {
            $set: {
                estadoCivil: req.body.estadoCivil,
                codigo: req.body.codigo,
                descripcion: req.body.descripcion
            }
        },
        function (err, estadoCivil) {
            if (err) {
                res.send(err);
            }
            EstadoCivil.find(function (err_, estadoCivil_) {
                if (err_) {
                    res.send(err_);
                }
                res.json(estadoCivil_);
            });
        });
};

exports.removeEstadoCivil = function (req, res) {
    EstadoCivil.remove({_id: req.params.tipoDocumento_id}, function (err, estadoCivil) {
        if (err) {
            res.send(err);
        }
        EstadoCivil.find(function (err_, estadoCivil_) {
            if (err_) {
                res.send(err_);
            }
            res.json(estadoCivil_);
        });
    });
};
