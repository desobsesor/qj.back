var Usuario = require('../../models/login/usuario');
var Persona = require('../../models/player/personalInformation/persona');
var Rol = require('../../models/login/rol');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'apiQJ';
let usuario_='';

exports.getUsuariosEnListaPaginada = function (req, res) {
    var esDetallado = req.params.esDetallado;
    if (esDetallado == "0") {
        Usuario.aggregate(
            [
                {"$match": {"persona": Persona}},
                {"$sort": {"nombreCompleto": 1}},
                {
                    "$group": {
                        "_id": "$documento",
                        "documento": {"$first": "$documento"},
                        "usuario": {"$first": "$usuario"},
                        "persona": {"$first": "$persona"},
                        "rol": {"$first": "$rol"},
                        "nombreCompleto": {"$first": "$nombreCompleto"},
                    }
                }
            ],
            function (err, results) {
                if (err) {
                    throw err;
                }
                Usuario.populate(results, {"path": "persona"}, function (err_, result1) {
                    if (err_) {
                        throw err_;
                    }
                    Rol.populate(result1, {"path": "rol"}, function (errr, result2) {
                        if (errr) {
                            throw errr;
                        }
                        res.json(result2);
                    });
                });
            }
        )
            .sort({documento: -1})
            .skip(req.params.rows * (parseInt(req.params.page) - 1)).limit(parseInt(req.params.rows));
    } else {
        Usuario.find(
            function (err, Usuarios) {
                if (err) {
                    res.send(err);
                }
                res.json(Usuarios);
            }
        ).populate('persona')
            .populate('nivelEducativo')
            .populate('rol')
            .sort({documento: -1})
            .skip(req.params.rows * (parseInt(req.params.page) - 1)).limit(parseInt(req.params.rows));
    }
};

exports.getUsuario = function (req, res, next) {
    /*res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header("Access-Control-Allow-Headers", "content-type, Authorization, Content-Length, X-Requested-With, Origin, Accept");*/
    /* Usuario.find(
         function (err, usuario) {
             if (err) {
                 res.send(err)
             }
             res.json(usuario);
         }
     );*/
    //res.header("Access-Control-Allow-Origin", "*");
    //res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST, OPTIONS');
    //res.header("Access-Control-Allow-Headers", "content-type, Authorization, Content-Length, X-Requested-With, Origin, Accept");
    //res.header("Access-Control-Expose-Headers", "Authorization");

    var user = {
        usuario: req.body.usuario,
        passwordHash: req.body.passwordHash
    };
    Usuario.findOne(user, (err, newUser) => {

        if (err) {
            return res.status(500).json({
                msg: 'Error login'
            });
        }
        if (!newUser) {
            return res.status(404).json({
                msg: 'No existe'
            });
        } else {
            const resultPass = user.passwordHash;
            if (resultPass) {
                const expiresIn = 24 * 60 * 60;
                const accessToken = jwt.sign({id: newUser._id},
                    SECRET_KEY, {
                        expiresIn: expiresIn
                    });
                newUser.token = accessToken;
                usuario_ = {
                    token: newUser.token+';'+newUser.usuario+';'+newUser.documento+';'+newUser.correo+';'+newUser.rol.rol
                };
                req.session.usuario = usuario_;
                req.session.admin = true;

                // console.log('Entro al login:', newUser)
            } else {
                return res.status(404).json({
                    msg: 'No existe'
                });
            }
        }
        return res.status(200).json(usuario_);
    }).populate("persona")
        .populate("rol")
        .populate("nivelEducativo");
};

exports.setUsuario = function (req, res) {
    Usuario.create({
            usuario: req.body.usuario,
            nombreCompleto: req.body.nombreCompleto,
            documento: req.body.documento,
            passwordHash: req.body.passwordHash,
            passwordSalt: req.body.passwordSalt,
            correo: req.body.correo,
            nivelEducativo: req.body.nivelEducativo,
            telefono: req.body.telefono,
            direccion: req.body.direccion,
            rol: "5cbb60f478b4003b34e088fe",
            activo: true,
            persona: "5bae6d3756f173a36704da7f"
        },
        function (err, usuario) {
            if (err) {
                res.send(err);
            }

            const expiresIn = 24 * 60 * 60;
            constAccesToken = jwt.sign({id: usuario._id},
                SECRET_KEY, {
                    expiresIn: expiresIn
                });

            Usuario.find({_id: usuario._id},
                function (err_, newUsuario) {
                    if (err_) {
                        return next(err_);
                    }
                    res.json(newUsuario);

                }).populate('persona')
                .populate('rol')
                .populate('nivelEducativo');
        });
};

exports.updateImagenUsuario = function (req, res) {
    Usuario.update({_id: req.params.usuario_id},
        {$set: {imagen: req.params.usuario_imagen}},
        function (err, usuario) {
            if (err) {
                res.send(err);
            }
            Usuario.find(function (err_, usuario_) {
                if (err_) {
                    res.send(err_);
                }
                res.json(usuario_);
            });
        });
}

exports.updateUsuario = function (req, res) {
    Usuario.update({_id: req.params.usuario_id},
        {
            $set: {
                usuario: req.body.usuario,
                passwordHash: req.body.passwordHash,
                nombre: req.body.nombre,
                apellidos: req.body.apellidos,
                documento: req.body.documento,
                sexo: req.body.sexo,
                email: req.body.email,
                telefono: req.body.telefono,
                direccion: req.body.direccion
            }
        },
        function (err, usuario) {
            if (err) {
                res.send(err);
            }
            Usuario.find(function (err_, usuario_) {
                if (err_) {
                    res.send(err_);
                }
                res.json(usuario_);
            });
        });
}

exports.removeUsuario = function (req, res) {
    Usuario.remove({_id: req.params.usuario_id}, function (err, usuario) {
        if (err) {
            res.send(err);
        }
        res.json(usuario);
    });
}
