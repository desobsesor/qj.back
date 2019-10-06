
var Cancha = require('../../models/sportfield/cancha');

// buscar canchas por el documento del cliente
exports.getCanchasPorCampoDeportivo = function (req, res) {
    console.log("req.params.campoDeportivo:" + req.params.campoDeportivo);
    Cancha.find({ campoDeportivo: req.params.campoDeportivo },
        function (err, cancha) {
            if (err)
                res.send(err);
            res.json(cancha); // devuelve todas las Canchas en JSON		
        }
    ).populate('encargado')
    .populate('campoDeportivo')
    .populate('tipo')
    .populate('estado');
};

// devuelve lista paginada
exports.getCanchasEnListaPaginada = function (req, res) {
    //console.log("req.params.documento:" + req.params.page);
    Cancha.find(
        function (err, cancha) {
            if (err)
                res.send(err);
            res.json(cancha); // devuelve todas las Canchas en JSON		
        }
    ).populate('encargado')
        .populate('campoDeportivo')
        .populate('tipo')
        .populate('estado').skip(parseInt(req.params.page) - 1).limit(parseInt(req.params.rows));
};

// Obtiene todos los objetos Cancha de la base de datos
exports.getCancha = function (req, res) {
    Cancha.find(
        function (err, cancha) {
            if (err)
                res.send(err);

            console.log(cancha);    
            res.json(cancha); // devuelve todas las Canchas en JSON		
        }
    ).populate('encargado')
        .populate('tipoCancha')
        .populate('estadoCancha')
        .populate('campoDeportivo');
        
};

// Guarda un objeto Cancha en base de datos
exports.setCancha = function (req, res) {
    // Creo el objeto Cancha
    console.log("ini//req.body");
    console.log(req.body);
    console.log("fin//req.body");

    Cancha.create(
        {
            id: req.body.id,
            numero: req.body.numero,
            cancha: req.body.cancha,
            documentoCliente: req.body.numero,
            cliente: req.body.cliente,
            fecha: Date.now(),
            horaInicio: req.body.horaInicio,
            horaFin: req.body.horaFin,
            direccionDespacho: req.body.direccionDespacho,
            subtotal: req.body.subtotal,
            total: req.body.total,
            descuentos: {
                porcentaje: req.body.descuentos.porcentaje,
                total: req.body.descuentos.total,
            },
            anulado: req.body.anulado,
            pagado: req.body.pagado,
            credito: req.body.credito,
            cajaControl: req.body.cajaControl,
            observaciones: req.body.observaciones,
            personaRegistro: req.body.personaRegistro,
            fechaRegistro: Date.now(),
            personaCambio: req.body.personaCambio,
            fechaCambio: Date.now(),
        },
        function (err, cancha) {
            if (err) {
                console.log("error");
                console.log(err);
                res.send(err);
            }
            console.log("creando cancha");
            console.log(cancha);
            console.log("//creando cancha");
            // Obtine y devuelve todas los jugadores tras crear uno de ellos
            Cancha.find(function (err, cancha) {
                if (err)
                    res.send(err);

                res.json(cancha);

            }).populate('cancha')
                .populate('cliente');
        });
};

// Modificamos un objeto Cancha de la base de datos
exports.updateEstadoCancha = function (req, res) {
    // Creo el objeto Cancha
    console.log("ini//req.body");
    console.log(req.body);
    console.log("fin//req.body");

    Cancha.update({ _id: req.body.idCancha },
        { $set: { estadoCancha: req.body.idEstado } },
        function (err, cancha) {
            if (err) {
                console.log(err);
                res.send(err);
            }

            // Obtine y devuelve todas las canchas tras crear una de ellas
            Cancha.find(function (err, cancha) {
                if (err)
                    res.send(err);
                res.json(cancha);
            }).populate('cancha')
                .populate('cliente');
        });
};

// Modificamos un objeto Cancha de la base de datos
exports.updateImagenCancha = function (req, res) {
    Cancha.update({ _id: req.params.jugador_id },
        { $set: { imagen: req.params.jugador_imagen } },
        function (err, cancha) {
            if (err) {
                console.log(err);
                res.send(err);
            }

            // Obtine y devuelve todas las jugadors tras crear una de ellas
            Cancha.find(function (err, cancha) {
                if (err)
                    res.send(err);
                res.json(cancha);
            }).populate('cancha')
                .populate('cliente');
        });
};
//en region
// Modificamos un objeto Cancha de la base de datos
exports.updateCancha = function (req, res) {
    Cancha.update({ _id: req.params.jugador_id },
        {
            $set: {
                id: req.body.id,
                numero: req.body.numero,
                cancha: req.body.cancha,
                documentoCliente: req.body.numero,
                cliente: req.body.cliente,
                fecha: Date.now(),
                horaInicio: req.body.horaInicio,
                horaFin: req.body.horaFin,
                direccionDespacho: req.body.direccionDespacho,
                subtotal: req.body.subtotal,
                total: req.body.total,
                descuentos: {
                    porcentaje: req.body.descuentos.porcentaje,
                    total: req.body.descuentos.total,
                },
                anulado: req.body.anulado,
                pagado: req.body.pagado,
                credito: req.body.credito,
                cajaControl: req.body.cajaControl,
                observaciones: req.body.observaciones,
                personaRegistro: req.body.personaRegistro,
                fechaRegistro: Date.now(),
                personaCambio: req.body.personaCambio,
                fechaCambio: Date.now(),
            }
        },
        function (err, cancha) {
            if (err)
                res.send(err);

            // Obtine y devuelve todas las canchas tras crear una de ellas
            Cancha.find(function (err, cancha) {
                if (err)
                    res.send(err);
                res.json(cancha);
            }).populate('cancha')
                .populate('cliente');
        });
};

// Elimino un objeto Cancha de la base de Datos
exports.removeCancha = function (req, res) {
    Cancha.remove({ _id: req.params.jugador_id }, function (err, cancha) {
        if (err)
            res.send(err);

        // Obtine y devuelve todas las jugadors tras borrar una de ellas
        Cancha.find(function (err, cancha) {
            if (err)
                res.send(err);
            res.json(cancha);
        }).populate('encargado')
            .populate('campoDeportivo')
            .populate('tipo')
            .populate('estado');
    });
};