var TipoDocumento = require('../../models/player/personalInformation/tipoDocumento');

// validar tipoDocumento
exports.getTipoDocumentos = function (req, res) {
    TipoDocumento.find({tipoDocumento: req.params.tipoDocumento, passwordHash: req.params.password},
        function (err, tipoDocumento) {
            if (err) {
                res.send(err);
            }
            res.json(tipoDocumento);
        }
    );
};

exports.getTipoDocumento = function (req, res) {
    TipoDocumento.find(
        function (err, tipoDocumento) {
            if (err) {
                res.send(err);
            }
            res.json(tipoDocumento);
        }
    );
};

exports.setTipoDocumento = function (req, res) {
    TipoDocumento.create(
        {
            tipoDocumento: req.body.tipoDocumento,
            codigo: req.body.codigo,
            descripcion: req.body.descripcion
        },
        function (err, tipoDocumento) {
            if (err) {
                res.send(err);
            }
            TipoDocumento.find(function (err_, tipoDocumento_) {
                if (err_) {
                    res.send(err_);
                }
                res.json(tipoDocumento_);
            });
        });
};

exports.updateImagenTipoDocumento = function (req, res) {
    TipoDocumento.update({_id: req.params.tipoDocumento_id},
        {$set: {imagen: req.params.tipoDocumento_imagen}},
        function (err, tipoDocumento) {
            if (err) {
                res.send(err);
            }
            TipoDocumento.find(function (err_, tipoDocumento_) {
                if (err_) {
                    res.send(err_);
                }
                res.json(tipoDocumento_);
            });
        });
};

exports.updateTipoDocumento = function (req, res) {
    TipoDocumento.update({_id: req.params.tipoDocumento_id},
        {
            $set: {
                tipoDocumento: req.body.tipoDocumento,
                codigo: req.body.codigo,
                descripcion: req.body.descripcion
            }
        },
        function (err, tipoDocumento) {
            if (err) {
                res.send(err);
            }
            TipoDocumento.find(function (err_, tipoDocumento_) {
                if (err_) {
                    res.send(err_);
                }
                res.json(tipoDocumento_);
            });
        });
};

exports.removeTipoDocumento = function (req, res) {
    TipoDocumento.remove({_id: req.params.tipoDocumento_id}, function (err, tipoDocumento) {
        if (err)
            res.send(err);

        TipoDocumento.find(function (err_, tipoDocumento_) {
            if (err_) {
                res.send(err_);
            }
            res.json(tipoDocumento_);
        });
    });
};
