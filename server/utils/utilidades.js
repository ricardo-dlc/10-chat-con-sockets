const moment = require('moment');

moment.locale('es');

const crearMensaje = (nombre, mensaje) => ({
    nombre,
    mensaje,
    fecha: moment().format('YYYY-MM-DD LT')
});

module.exports = {
    crearMensaje
};
