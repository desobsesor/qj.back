//Apuntador
var RolUsuario = require('../../models/login/rolUsuario');

/**
* Obtiene objetos RolUsuario de la base de datos en base a un valor de consulta
* @param {string} req -
* @param {string} res -
*/
exports.getRolYUsuario = function (req, res) {
    console.log(req.params.usuario, req.params.rol  );
    RolUsuario.findOne({ 
            usuario: req.params.usuario, 
            rol: req.params.rol 
        },
        function (err, rolUsuario) {
            if (err)
                res.send(err);

            res.send({msg:"EXITO EN LA OPERACIÓN", rolUsuario:rolUsuario});
            //res.json(rolUsuario); // devuelve todos los Items en JSON		
        }
    );
};

/**
* Obtiene objetos RolUsuario de la base de datos en base a un valor de consulta
* @param {string} req -
* @param {string} res -
*/
exports.getRolUsuarioByFecha = function (req, res) {
    console.log("req.params.fechaRolUsuario:", req.params.fechaRolUsuario+' 00:00:00.000');

    //RolUsuario.find({ fechaRolUsuario: {"$gte" : req.params.fechaRolUsuario+' 00:00:00.000'}},
    RolUsuario.find({ fechaRolUsuario:  req.params.fechaRolUsuario+' 00:00:00.000'},
        function (err, rolUsuario) {
            if (err)
                res.send(err);

            res.json(rolUsuario); // devuelve todos los Items en JSON		
        }
    ).populate('cliente')
    .populate('cajaControl')
    .populate('persona');
};

/**
* Obtiene todos los objetos RolUsuario de la base de datos filtrado por los no anulados
* @param {string} req -
* @param {string} res -
*/
exports.getRolUsuario = function (req, res) {
    RolUsuario.find({anulado: false},
        function (err, rolUsuario) {
            if (err)
                res.send(err);
                
            res.json(rolUsuario); // devuelve todos los Items en JSON		
        }
    ).lean();
};

exports.getRolUsuariosEnListaPaginada = function (req, res) {
    //console.log("req.params.page:::" + req.params.page);
    //console.log("req.params.rows:::" + req.params.rows);
    RolUsuario.find(
        function (err, rolUsuario) {
            if (err)
                res.send(err);
                
            res.json(rolUsuario); // devuelve todas las Noticias en JSON		
        }
    ).populate('cliente')
    .populate('cajaControl')
    .populate('persona')
    .skip(req.params.rows*(parseInt(req.params.page) - 1)).limit(parseInt(req.params.rows));
};

// Obtiene todos los objetos CajaControl de la base de datos
exports.getRolUsuarioAbierta = function (req, res) {
    RolUsuario.findOne({ aprobado : false, anulado:false },
        function (err, rolUsuario) {
            if (err)
                res.send(err);

            res.json(rolUsuario); // devuelve un JSON		
        }
    ).populate('cliente')
    .populate('cajaControl')
    .populate('personaRegistro');
};
/**
* Guarda un objeto RolUsuario en base de datos
* @param {string} req -
* @param {string} res -
*/
exports.setRolUsuario = function (req, res) {
    console.log('req.body.contactoDespacho.blog',  req.body.contactoDespacho.blog);
    console.log('req.body.contactoDespacho.correoElectronico', req.body.contactoDespacho.correoElectronico);
    console.log('req.body.contactoDespacho.telefonoCelular', req.body.contactoDespacho.telefonoCelular);
    console.log('req.body.documentoCliente', req.body.documentoCliente);
    console.log('req.body.cliente', req.body.cliente);

    RolUsuario.create({// se crea el objeto RolUsuario
        codigo: "",
        direccionDespacho: req.body.direccionDespacho,
        contactoDespacho: {
            blog: req.body.contactoDespacho.blog,
            correoElectronico: req.body.contactoDespacho.correoElectronico,
            //telefonoFijo: req.body.telefonoFijo,
            telefonoCelular: req.body.contactoDespacho.telefonoCelular,
            //notaContacto1: req.body.notaContacto1,
            //notaContacto2: req.body.notaContacto2,
            //notaContacto3: req.body.notaContacto3
        },
        subtotal:0.0,
        total:0.0,
        impuestos:{
            porcentaje: 0.0,
            total:0.0
        },    
        descuentos:{
            porcentaje: 0.0,
            total:0.0
        },
        cliente: req.body.cliente,
        documentoCliente:req.body.documentoCliente,
        credito: false,
        anulado: false,
        aprobado: false,
        cajaControl: req.body.cajaControl,
        observaciones: req.body.observaciones,
        personaRegistro: req.session.usuario.persona,
        fechaRegistro:  Date.now() 
    },
        function (err, rolUsuario) {
            if (err)
                res.send({msg: err});

                RolUsuario.findOne({_id:rolUsuario._id},
                    function (err, facturaU) {
                        if (err)
                            res.send(err);
                            
                            res.send({msg:"EXITO EN LA OPERACIÓN", rolUsuario: facturaU}); // devuelve todas las Noticias en JSON		
                    }
                ).populate('cliente')
                .populate('cajaControl')
                .populate('personaRegistro');

            
        }
    );
};

// Modificamos un objeto RolUsuario de la base de datos
exports.updateRolUsuario = function (req, res) {

    RolUsuario.update({ _id: req.params.factura_id },
        {
            $set: {
                codigo: "",
                direccionDespacho: req.body.direccionDespacho,
                contactoDespacho: {
                    blog: req.body.blog,
                    correoElectronico: req.body.correoElectronico,
                    //telefonoFijo: req.body.telefonoFijo,
                    telefonoCelular: req.body.telefonoCelular,
                    //notaContacto1: req.body.notaContacto1,
                    //notaContacto2: req.body.notaContacto2,
                    //notaContacto3: req.body.notaContacto3
                },
                subtotal:req.body.subtotal,
                total:req.body.total,
                impuestos:{
                    porcentaje: req.body.impuestos.porcentaje,
                    total:req.body.impuestos.total,
                },    
                descuentos:{
                    porcentaje: req.body.descuentos.porcentaje,
                    total:req.body.descuentos.total,
                },
                cliente: req.body.cliente,
                documentoCliente:req.body.documentoCliente,
                credito:req.body.credito,
                anulado: false,
                aprobado: true,
                cajaControl: req.body.cajaControl,
                observaciones: req.body.observaciones,
                personaCambio: req.session.usuario.persona,
                fechaCambio:  Date.now() 
            }
        },
        function (err, rolUsuario) {
            if (err)   
                res.send({msg: err});

                RolUsuario.findOne({_id:req.params.factura_id},
                    function (err, facturaU) {
                        if (err)
                            res.send(err);
                            
                            res.send({msg:"EXITO EN LA OPERACIÓN", rolUsuario: facturaU}); // devuelve JSON		
                    }
                ).populate('cliente')
                .populate('cajaControl')
                .populate('persona');
        }
    );
};
// Modificamos un objeto RolUsuario de la base de datos
exports.pagarRolUsuario = function (req, res) {
    console.log("req.body:",req.body);
    RolUsuario.updateOne({ _id: req.params.factura_id },
        {
            $set: {
                subtotal:req.body.subtotal,
                total:req.body.total,
                impuestos:{
                    porcentaje: req.body.impuestos.porcentaje,
                    total:req.body.impuestos.total,
                },    
                descuentos:{
                    porcentaje: req.body.descuentos.porcentaje,
                    total:req.body.descuentos.total,
                },
                credito:req.body.credito,
                efectivo:req.body.efectivo,
                cambio:req.body.cambio,
                aprobado: true,
                personaCambio: req.session.usuario.persona,
                fechaCambio:  Date.now() 
            }
        },
        function (err, rolUsuario) {
            if (err)   
                res.send({msg: err});

                RolUsuario.findOne({_id:req.params.factura_id},
                    function (err, facturaU) {
                        if (err)
                            res.send(err);
                            
                            res.send({msg:"EXITO EN LA OPERACIÓN", rolUsuario: facturaU}); // devuelve JSON		
                    }
                ).populate('cliente')
                .populate('cajaControl')
                .populate('persona');
        }
    );
};
// Elimino un objeto RolUsuario de la base de Datos
exports.removeRolUsuario = function (req, res) {
    RolUsuario.remove({ _id: req.params.factura_id }, function (err, rolUsuario) {
        if (err)
            res.send({msg: err});

        res.send({msg:"EXITO EN LA OPERACIÓN"});
    });
};