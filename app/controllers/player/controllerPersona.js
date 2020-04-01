var Persona = require('../../models/player/personalInformation/persona');

exports.getPersonas = function (req, res) {
    Persona.find({persona: req.params.persona, passwordHash: req.params.password},
        function (err, persona) {
            if (err) {
                res.send(err);
            }
            res.json(persona);
        }
    );
};

exports.getPersona = function (req, res) {
    Persona.find(
        function (err, persona) {
            if (err) {
                res.send(err);
            }
            res.json(persona);
        }
    );
};

exports.setPersona = function (req, res) {
    // Creo el objeto Persona
    Persona.create(
        {
            nombres: {
                primerNombre: req.body.primerNombre,
                segundoNombre: req.body.segundoNombre
            },
            apellidos: {
                primerApellido: req.body.primerApellido,
                segundoApellido: req.body.segundoApellido
            },
            fechaNacimiento: req.body.fechaNacimiento,
            tipoDocumento: req.body.tipoDocumento,
            documento: req.body.documento,
            sexo: req.body.sexo,
            direccionResidencia: {
                municipio: req.body.municipio,
                barrio: req.body.barrio,
                calle: req.body.calle,
                manzana: req.body.manzana,
                numero: req.body.numero
            },
            direccionLaboral: {
                municipio: req.body.municipio,
                barrio: req.body.barrio,
                calle: req.body.calle,
                manzana: req.body.manzana,
                numero: req.body.numero
            },
            contacto: {
                blog: req.body.blog,
                correoElectronico: req.body.correoElectronico,
                telefonoFijo: req.body.telefonoFijo,
                telefonoCelular: req.body.telefonoCelular,
                notaContacto1: req.body.notaContacto1,
                notaContacto2: req.body.notaContacto2,
                notaContacto3: req.body.notaContacto3
            },
            datosLaborales: {
                empresa: req.body.empresa,
                profesion: req.body.profesion,
                cargo: req.body.cargo
            },
            personaRegistro: req.body.personaRegistro,
            fechaRegistro: Date.now(),
            personaCambio: req.body.personaCambio,
            fechaCambio: Date.now()
        },
        function (err, persona) {
            if (err) {
                res.send(err);
            }
            Persona.find(function (err_, persona_) {
                if (err_) {
                    res.send(err_);
                }
                res.json(persona_);
            });
        }
    );
};

exports.updateImagenPersona = function (req, res) {
    Persona.update({_id: req.params.persona_id},
        {$set: {imagen: req.params.persona_imagen}},
        function (err, persona) {
            if (err) {
                console.log(err);
                res.send(err);
            }
            Persona.find(function (err_, persona_) {
                if (err_) {
                    res.send(err_);
                }
                res.json(persona_);
            });
        });
};

exports.updatePersona = function (req, res) {
    Persona.update({_id: req.params.persona_id},
        {
            $set: {
                nombres: {
                    primerNombre: req.body.primerNombre,
                    segundoNombre: req.body.segundoNombre
                },
                apellidos: {
                    primerApellido: req.body.primerApellido,
                    segundoApellido: req.body.segundoApellido
                },
                fechaNacimiento: req.body.fechaNacimiento,
                tipoDocumento: req.body.tipoDocumento,
                documento: req.body.documento,
                sexo: req.body.sexo,
                direccionResidencia: {
                    municipio: req.body.municipio,
                    barrio: req.body.barrio,
                    calle: req.body.calle,
                    manzana: req.body.manzana,
                    numero: req.body.numero
                },
                direccionLaboral: {
                    municipio: req.body.municipio,
                    barrio: req.body.barrio,
                    calle: req.body.calle,
                    manzana: req.body.manzana,
                    numero: req.body.numero
                },
                contacto: {
                    blog: req.body.blog,
                    correoElectronico: req.body.correoElectronico,
                    telefonoFijo: req.body.telefonoFijo,
                    telefonoCelular: req.body.telefonoCelular,
                    notaContacto1: req.body.notaContacto1,
                    notaContacto2: req.body.notaContacto2,
                    notaContacto3: req.body.notaContacto3
                },
                datosLaborales: {
                    empresa: req.body.empresa,
                    profesion: req.body.profesion,
                    cargo: req.body.cargo
                },
                personaRegistro: req.body.personaRegistro,
                fechaRegistro: Date.now(),
                personaCambio: req.body.personaCambio,
                fechaCambio: Date.now()
            }
        },
        function (err, persona) {
            if (err) {
                res.send(err);
            }
            Persona.find(function (err_, persona_) {
                if (err_) {
                    res.send(err_);
                }
                res.json(persona_);
            });
        });
};

exports.removePersona = function (req, res) {
    Persona.remove({_id: req.params.persona_id}, function (err, persona) {
        if (err)
            res.send(err);

        Persona.find(function (err_, persona_) {
            if (err_) {
                res.send(err_);
            }
            res.json(persona_);
        });
    });
};
