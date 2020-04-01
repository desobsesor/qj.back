var Empresa = require('../../models/company/empresa');

exports.getEmpresas = function (req, res) {
    Empresa.find({ empresa: req.params.empresa, passwordHash: req.params.password },
        function (err, empresa) {
            if (err) {
                res.send(err);
            }
            res.json(empresa);
        }
    );
};

exports.getEmpresa = function (req, res) {
    Empresa.find(
        function (err, empresa) {
            if (err) {
                res.send(err);
            }
            res.json(empresa);
        }
    );
};

exports.setEmpresa = function (req, res) {
    Empresa.create(
        {
            empresa: req.body.empresa,
            codigo: req.body.codigo,
            descripcion: req.body.descripcion
        },
        function (err, empresa) {
            if (err) {
                res.send(err);
            }
            Empresa.find(function (err_, empresa_) {
                if (err_) {
                    res.send(err_);
                }
                res.json(empresa_);
            });
        });
};

exports.updateImagenEmpresa = function (req, res) {
    Empresa.update({ _id: req.params.empresa_id },
        { $set: { imagen: req.params.empresa_imagen } },
        function (err, empresa) {
            if (err) {
                res.send(err);
            }
            Empresa.find(function (err_, empresa_) {
                if (err_) {
                    res.send(err_)
                }
                res.json(empresa_);
            });
        });
};

exports.updateEmpresa = function (req, res) {
    Empresa.update({ _id: req.params.empresa_id },
        {
            $set: {
                empresa: req.body.empresa,
                codigo: req.body.codigo,
                descripcion: req.body.descripcion
            }
        },
        function (err, empresa) {
            if (err) {
                res.send(err);
            }
            Empresa.find(function (err_, empresa_) {
                if (err_) {
                    res.send(err_);
                }
                res.json(empresa_);
            });
        });
};

exports.removeEmpresa = function (req, res) {
    Empresa.remove({ _id: req.params.empresa_id }, function (err, empresa) {
        if (err) {
            res.send(err);
        }
        Empresa.find(function (err_, empresa_) {
            if (err_) {
                res.send(err_);
            }
            res.json(empresa_);
        });
    });
};
