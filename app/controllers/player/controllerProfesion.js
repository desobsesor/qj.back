var Profesion = require('../../models/player/personalInformation/profesion');

exports.getProfesions = function (req, res) {
    Profesion.find({profesion: req.params.profesion, passwordHash: req.params.password},
        function (err, profesion) {
            if (err) {
                res.send(err);
            }
            res.json(profesion);
        }
    );
};

exports.getProfesion = function (req, res) {
    Profesion.find(
        function (err, profesion) {
            if (err) {
                res.send(err);
            }
            res.json(profesion);
        }
    );
};

exports.setProfesion = function (req, res) {
    Profesion.create(
        {
            profesion: req.body.profesion,
            codigo: req.body.codigo,
            descripcion: req.body.descripcion
        },
        function (err, profesion) {
            if (err) {
                res.send(err);
            }
            Profesion.find(function (err_, profesion_) {
                if (err_) {
                    res.send(err_);
                }
                res.json(profesion_);
            });
        });
};

exports.updateImagenProfesion = function (req, res) {
    Profesion.update({_id: req.params.profesion_id},
        {$set: {imagen: req.params.profesion_imagen}},
        function (err, profesion) {
            if (err) {
                res.send(err);
            }
            Profesion.find(function (err_, profesion_) {
                if (err_) {
                    res.send(err_);
                }
                res.json(profesion_);
            });
        });
};

exports.updateProfesion = function (req, res) {
    Profesion.update({_id: req.params.profesion_id},
        {
            $set: {
                profesion: req.body.profesion,
                codigo: req.body.codigo,
                descripcion: req.body.descripcion
            }
        },
        function (err, profesion) {
            if (err) {
                res.send(err);
            }
            Profesion.find(function (err_, profesion_) {
                if (err_) {
                    res.send(err_);
                }
                res.json(profesion_);
            });
        });
};

exports.removeProfesion = function (req, res) {
    Profesion.remove({_id: req.params.profesion_id}, function (err, profesion) {
        if (err) {
            res.send(err);
        }
        Profesion.find(function (err_, profesion_) {
            if (err_) {
                res.send(err_);
            }
            res.json(profesion_);
        });
    });
};
