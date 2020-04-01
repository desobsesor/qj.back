var Sexo = require('../../models/player/personalInformation/sexo');

exports.getSexo = function (req, res) {
    Sexo.find(
            function (err, sexo) {
                if (err) {
                    res.send(err);
                }
                res.json(sexo);
            }
    );
};

exports.setSexo = function (req, res) {
    Sexo.create(
            {sexo: req.body.sexo},
    function (err, sexo) {
        if (err) {
            res.send(err);
        }
        Sexo.find(function (err_, sexo_) {
            if (err_) {
                res.send(err_);
            }
            res.json(sexo_);
        });
    });
}

exports.updateSexo = function (req, res) {
    Sexo.update({_id: req.params.sexo_id},
    {$set: {sexo: req.body.sexo}},
    function (err, sexo) {
        if (err) {
            res.send(err);
        }
        Sexo.find(function (err_, sexo_) {
            if (err_) {
                res.send(err_);
            }
            res.json(sexo_);
        });
    });
}

exports.removeSexo = function (req, res) {
    Sexo.remove({_id: req.params.sexo_id}, function (err, sexo) {
        if (err) {
            res.send(err);
        }
        Sexo.find(function (err_, sexo_) {
            if (err_) {
                res.send(err_);
            }
            res.json(sexo_);
        });
    });
}
