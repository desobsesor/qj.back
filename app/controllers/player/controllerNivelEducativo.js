var NivelEducativo = require('../../models/player/personalInformation/nivelEducativo');

exports.getEstadosCiviles = function (req, res) {
    NivelEducativo.find({ nivelEducativo: req.params.nivelEducativo, passwordHash: req.params.password },
        function (err, nivelEducativo) {
            if (err) {
                res.send(err);
            }
            res.json(nivelEducativo);
        }
    );
};

exports.getNivelEducativo = function (req, res) {
    NivelEducativo.find(
        function (err, nivelEducativo) {
            if (err) {
                res.send(err);
            }
            res.json(nivelEducativo);
        }
    );
};

exports.setNivelEducativo = function (req, res) {
    NivelEducativo.create(
        {
            nivelEducativo: req.body.nivelEducativo,
            codigo: req.body.codigo,
            descripcion: req.body.descripcion
        },
        function (err, nivelEducativo) {
            if (err)
                res.send(err);

            NivelEducativo.find(function (err_, nivelEducativo_) {
                if (err_) {
                    res.send(err_);
                }
                res.json(nivelEducativo_);
            });
        });
};

exports.updateImagenNivelEducativo = function (req, res) {
    NivelEducativo.update({ _id: req.params.tipoDocumento_id },
        { $set: { imagen: req.params.tipoDocumento_imagen } },
        function (err, nivelEducativo) {
            if (err) {
                res.send(err);
            }
            NivelEducativo.find(function (err_, nivelEducativo_) {
                if (err_) {
                    res.send(err_);
                }
                res.json(nivelEducativo_);
            });
        });
};

exports.updateNivelEducativo = function (req, res) {
    NivelEducativo.update({ _id: req.params.tipoDocumento_id },
        {
            $set: {
                nivelEducativo: req.body.nivelEducativo,
                codigo: req.body.codigo,
                descripcion: req.body.descripcion
            }
        },
        function (err, nivelEducativo) {
            if (err) {
                res.send(err);
            }
            NivelEducativo.find(function (err_, nivelEducativo_) {
                if (err_) {
                    res.send(err_);
                }
                res.json(nivelEducativo_);
            });
        });
};

exports.removeNivelEducativo = function (req, res) {
    NivelEducativo.remove({ _id: req.params.tipoDocumento_id }, function (err, nivelEducativo) {
        if (err) {
            res.send(err);
        }
        NivelEducativo.find(function (err_, nivelEducativo_) {
            if (err_) {
                res.send(err_);
            }
            res.json(nivelEducativo_);
        });
    });
};
