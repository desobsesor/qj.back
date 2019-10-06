
var Usuario = require('../../models/login/usuario');
var Persona = require('../../models/player/personalInformation/persona');
var Rol = require('../../models/login/rol');

exports.getUsuariosEnListaPaginada = function (req, res) {
    var esDetallado = req.params.esDetallado;
    if(esDetallado=="0"){
        Usuario.aggregate(
            [
                { "$match": { "persona": Persona } },
                { "$sort": { "nombreCompleto": 1 } },
                { "$group": { 
                    "_id": "$documento",
                    "documento": { "$first": "$documento"},
                    "usuario": { "$first": "$usuario"},
                    "persona": { "$first": "$persona" },
                    "rol": { "$first": "$rol" },
                    "nombreCompleto": { "$first": "$nombreCompleto" },
                }}
            ],
            function(err,results) {
                if (err) throw err;
                Usuario.populate( results, { "path": "persona" }, function(err,result1) {
                    if (err) throw err;
                    Rol.populate( result1, { "path": "rol" }, function(err,result2) {
                        if (err) throw err;
                        res.json(result2);
                    });
                });
            }
        )
        .sort({documento : -1})
        .skip(req.params.rows*(parseInt(req.params.page) - 1)).limit(parseInt(req.params.rows));
    }else{
        Usuario.find(
            function (err, Usuarios) {
                if (err)
                    res.send(err);
                    
                res.json(Usuarios); // devuelve todos los objetos en JSON
            }
        ).populate('persona')
        .populate('nivelEducativo')
        .populate('rol')
        .sort({documento : -1})
        .skip(req.params.rows*(parseInt(req.params.page) - 1)).limit(parseInt(req.params.rows));
    }
};

// Obtiene todos los objetos Usuario de la base de datos
exports.getUsuario = function (req, res) {
    Usuario.find(
        function (err, usuario) {
            if (err)
                res.send(err)
            res.json(usuario); // devuelve todas las Usuarios en JSON		
        }
    );
}

// Guarda un objeto Usuario en base de datos
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
            if (err)
                res.send(err);

            //console.log("usuario", usuario);

            //res.send({msg:"EXITO EN LA OPERACIÓN"});
            //res.json(usuario);
            Usuario.find({ _id: usuario._id },
                function (err, newUsuario) {
                    if (err)
                        return next(err);

                    res.json(newUsuario);

                }).populate('persona')
                .populate('rol')
                .populate('nivelEducativo');
        });
};

// Modificamos un objeto Usuario de la base de datos
exports.updateImagenUsuario = function (req, res) {
    Usuario.update({ _id: req.params.usuario_id },
        { $set: { imagen: req.params.usuario_imagen } },
        function (err, usuario) {
            if (err) {
                console.log(err);
                res.send(err);
            }

            // Obtine y devuelve todas las usuarios tras crear una de ellas
            Usuario.find(function (err, usuario) {
                if (err)
                    res.send(err)
                res.json(usuario);
            });
        });
}

// Modificamos un objeto Usuario de la base de datos
exports.updateUsuario = function (req, res) {
    Usuario.update({ _id: req.params.usuario_id },
        { $set: { usuario: req.body.usuario, passwordHash: req.body.passwordHash, nombre: req.body.nombre, apellidos: req.body.apellidos, documento: req.body.documento, sexo: req.body.sexo, email: req.body.email, 
            telefono: req.body.telefono, direccion: req.body.direccion 
        } },
        function (err, usuario) {
            if (err)
                res.send(err);

            // Obtine y devuelve todas las usuarios tras crear una de ellas
            Usuario.find(function (err, usuario) {
                if (err)
                    res.send(err)
                res.json(usuario);
            });
        });
}

// Elimino un objeto Usuario de la base de Datos
exports.removeUsuario = function (req, res) {
    Usuario.remove({ _id: req.params.usuario_id }, function (err, usuario) {
        if (err)
            res.send(err);

        // Obtine y devuelve todas las usuarios tras borrar una de ellas
        Usuario.find(function (err, usuario) {
            if (err)
                res.send(err)
            res.json(usuario);
        });
    });
}
