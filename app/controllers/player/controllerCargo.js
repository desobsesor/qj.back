var Cargo = require('../../models/player/personalInformation/cargo');

exports.getCargos = function (req, res) {
    Cargo.find({cargo: req.params.cargo, passwordHash: req.params.password},
        function (err, cargo) {
            if (err) {
                res.send(err);
            }
            res.json(cargo);
        }
    );
};

exports.getCargo = function (req, res) {
    Cargo.find(
        function (err, cargo) {
            if (err) {
                res.send(err);
            }
            res.json(cargo);
        }
    );
};

exports.setCargo = function (req, res) {
    Cargo.create(
        {
            cargo: req.body.cargo,
            codigo: req.body.codigo,
            descripcion: req.body.descripcion
        },
        function (err, cargo) {
            if (err) {
                res.send(err);
            }
            Cargo.find(function (err_, cargo_) {
                if (err_) {
                    res.send(err_);
                }
                res.json(cargo_);
            });
        });
};

exports.updateImagenCargo = function (req, res) {
    Cargo.update({_id: req.params.cargo_id},
        {$set: {imagen: req.params.cargo_imagen}},
        function (err, cargo) {
            if (err) {
                res.send(err);
            }
            Cargo.find(function (err_, cargo_) {
                if (err_) {
                    res.send(err_);
                }
                res.json(cargo_);
            });
        });
};

exports.updateCargo = function (req, res) {
    Cargo.update({_id: req.params.cargo_id},
        {
            $set: {
                cargo: req.body.cargo,
                codigo: req.body.codigo,
                descripcion: req.body.descripcion
            }
        },
        function (err, cargo) {
            if (err) {
                res.send(err);
            }
            Cargo.find(function (err_, cargo_) {
                if (err_) {
                    res.send(err_);
                }
                res.json(cargo_);
            });
        });
};

exports.removeCargo = function (req, res) {
    Cargo.remove({_id: req.params.cargo_id}, function (err, cargo) {
        if (err) {
            res.send(err);
        }
        Cargo.find(function (err_, cargo_) {
            if (err_) {
                res.send(err_);
            }
            res.json(cargo_);
        });
    });
};
