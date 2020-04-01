//#region CONTROLADORES Y OBJETOS PARA ENRUTAR
var Empresa = require('../models/company/empresa');
var RolUsuario = require('../models/login/rolUsuario');
var ControllerRolUsuario = require('../controllers/login/controllerRolUsuario');
var ControllerDisciplinaDeportiva = require('../controllers/player/controllerDisciplinaDeportiva');
var ControllerPosicion = require('../controllers/player/controllerPosicion');
var ControllerNivelDeportivo = require('../controllers/player/controllerNivelDeportivo');
var ControllerCampoDeportivo = require('../controllers/sportfield/controllerCampoDeportivo');
var Rol = require('../models/login/rol');
var ControllerUsuario = require('../controllers/login/controllerUsuario');
var Usuario = require('../models/login/usuario');
var Contacto = require('../models/player/contacto');
var ControllerContacto = require('../controllers/player/controllerContacto');
var ControllerNivelEducativo = require('../controllers/player/controllerNivelEducativo');
var NivelEducativo = require('../models/player/personalInformation/nivelEducativo');
var Cancha = require('../models/sportfield/cancha');
var TipoCancha = require('../models/sportfield/tipoCancha');
var EstadoCancha = require('../models/sportfield/estadoCancha');
var CampoDeportivo = require('../models/sportfield/campoDeportivo');
var ControllerCancha = require('../controllers/sportfield/controllerCancha');
var Persona = require('../models/player/personalInformation/persona');
//#endregion

// mongoose para mongodb
var multer = require('multer');
const path = require('path');
var mime = require('mime');
var fs = require('fs');
var sesiones = require('../controllers/login/controllerSesiones');

module.exports = function (app) {

    //#region RUTAS ABIERTAS DEL API
    //#region GESTIÓN DE SESIÓN DE USUARIO

    const auth = function (req, res, next) {
        //if (req.session && req.session.user === "jose" && req.session.admin)
        if (req.session /*&& req.session.usuario*/ && req.session.admin)
            return next();
        else
            return res.sendStatus(401);
    };

    app.post('/api/login', function (req, res, next) {

        //res.header("Access-Control-Allow-Origin", "*");
        //res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST, OPTIONS');
        //res.header("Access-Control-Allow-Headers", "content-type, Authorization, Content-Length, X-Requested-With, Origin, Accept");
        //res.header("Access-Control-Expose-Headers", "Authorization");

        var user = {
            usuario: req.body.usuario,
            passwordHash: req.body.passwordHash
        };
        Usuario.findOne(user, function (err, newUser) {
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
                console.log(newUser);
                req.session.usuario = newUser;
                req.session.admin = true;
            }

            return res.status(200).json(newUser);

        }).populate("persona")
            .populate("rol")
            .populate("nivelEducativo");
    });

    //Destruir la sesión completa.
    app.get('/api/logout', auth, function (req, res) {
/*
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST, OPTIONS');
        res.header("Access-Control-Allow-Headers", "content-type, Authorization, Content-Length, X-Requested-With, Origin, Accept");
*/
        req.session.destroy();
        console.log('Sessión Destruida.');
        return res.status(200).json({msg: 'Sessión Destruida.'});
    });
    //#endregion
    //ROLES
    app.get('/api/rolUsuario/:usuario/:rol', function (req, res) {

        /*res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST, OPTIONS');
        res.header("Access-Control-Allow-Headers", "content-type, Authorization, Content-Length, X-Requested-With, Origin, Accept");*/
        ControllerRolUsuario.getRolYUsuario(req, res);
    });
    // DISCIPLINAS DEPORTIVAS
    app.get('/api/disciplinasDeportivas', ControllerDisciplinaDeportiva.getDisciplinasDeportivas);
    // POSICIONES
    app.get('/api/posiciones', ControllerPosicion.getPosiciones);
    // NIVELES DEPORTIVOS
    app.get('/api/nivelesDeportivos', ControllerNivelDeportivo.getNivelesDeportivos);
    // NIVELES DEPORTIVOS
    app.get('/api/camposDeportivos', ControllerCampoDeportivo.getCamposDeportivos);
    app.post('/api/campoDeportivo', ControllerCampoDeportivo.setCampoDeportivo);
    // USUARIOS
    app.get('/api/usuario', ControllerUsuario.getUsuario);
    app.get('/api/usuario/:page/:rows/:esDetallado', ControllerUsuario.getUsuariosEnListaPaginada);
    app.post('/api/usuario', ControllerUsuario.setUsuario);
    app.put('/api/usuario/:usuario_id', ControllerUsuario.updateUsuario);
    // ESCENARIOS
    app.get('/api/cancha', ControllerCancha.getCancha);
    //app.get('/api/cancha/:campoDeportivo', ControllerCancha.getCanchasPorTipo);
    //app.get('/api/cancha/:campoDeportivo', ControllerCancha.getCanchasPorCampoDeportivo);
    app.post('/api/cancha', ControllerCancha.setCancha);
    app.put('/api/canchaUpdateEstado', ControllerCancha.updateEstadoCancha);
    app.put('/api/cancha/:cancha_id', ControllerCancha.updateCancha);
    app.delete('/api/cancha/:cancha_id', ControllerCancha.removeCancha);
    // SESIONES
    app.get('/api/identificacion', sesiones.getIdentificacion);
    app.post('/api/identificacion', sesiones.postIdentificacion);
    app.get('/api/bienvenida', sesiones.bienvenida);
    app.get('/api/salir', sesiones.salir);
    // NIVEL EDUCATIVO
    app.get('/api/nivelEducativo', ControllerNivelEducativo.getNivelEducativo);
    app.post('/api/nivelEducativo', ControllerNivelEducativo.setNivelEducativo);
    app.put('/api/nivelEducativo/:nivelEducativo_id', ControllerNivelEducativo.updateNivelEducativo);
    app.delete('/api/nivelEducativo/:nivelEducativo_id', ControllerNivelEducativo.removeNivelEducativo);
    // USUARIOS
    app.get('/api/usuario', ControllerUsuario.getUsuario);
    app.post('/api/usuario', ControllerUsuario.setUsuario);
    app.put('/api/usuario/:usuario_id', ControllerUsuario.updateUsuario);
    app.delete('/api/usuario/:usuario_id', ControllerUsuario.removeUsuario);//app.put('/api/usuario/:usuario_id/usuario/:usuario_imagen', ControllerUsuario.updateImagenUsuario);

    //#endregion
};
