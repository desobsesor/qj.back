//#region CONEXIONES A BD EN PRODUCCIÓN
const uri = 'mongodb://167.86.127.137:27037/cds_qj'; //modo remoto
//#endregion

//#region CONEXIONES A BD LOCAL
//const uri = 'mongodb://127.0.0.1:27017/cds_qj'; //modo local
//#endregion

module.exports = {
    mongoURI: uri
};

