var Contacto = require('../../models/player/contacto');

exports.getContacto = function (req, res) {
    Contacto.find(
        function (err, contacto) {
            if (err) {
                res.send(err);
            }
            res.json(contacto);
        }
    );
};

exports.setContactoBoletin = function (req, res) {
    Contacto.create(
        { nombre: req.body.nombre, apellidos: req.body.apellidos, email: req.body.email, boletin: true, contacto: 'Registro al Boletin', fecha: req.body.fecha },
        function (err, contacto) {
            if (err) {
                res.send(err);
            }
            Contacto.find(function (err_, contacto_) {
                if (err_) {
                    res.send(err_);
                }
                res.json(contacto_);
            });
        });
};

exports.setContacto = function (req, res) {
    Contacto.create(
        { nombre: req.body.nombre, apellidos: req.body.apellidos, email: req.body.email, boletin: req.body.boletin, contacto: req.body.contacto, fecha: req.body.fecha },
        function (err, contacto) {
            if (err) {
                res.send(err);
            }
            Contacto.find(function (err_, contacto_) {
                if (err_) {
                    res.send(err_);
                }
                res.json(contacto_);
            });
        });

};

exports.updateContacto = function (req, res) {
    Contacto.updateOne({ _id: req.params.contacto_id },
        { $set: { nombre: req.body.nombre, apellidos: req.body.apellidos, email: req.body.email, boletin: req.body.boletin, contacto: req.body.contacto, fecha: req.body.fecha } },
        function (err, contacto) {
            if (err) {
                res.send(err);
            }
            Contacto.find(function (err_, contacto_) {
                if (err_) {
                    res.send(err_);
                }
                res.json(contacto_);
            });
        });
};

exports.removeContacto = function (req, res) {
    Contacto.remove({ _id: req.params.contacto_id }, function (err, contacto) {
        if (err) {
            res.send(err);
        }
        Contacto.find(function (err_, contacto_) {
            if (err_) {
                res.send(err_);
            }
            res.json(contacto_);
        });
    });
};
