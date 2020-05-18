const { io } = require('../server');
const { crearMensaje } = require('../utils/utilidades');

const Usuarios = require('../classes/usuarios');

const usuarios = new Usuarios();

io.on('connection', (client) => {
    console.log('Usuario conectado ');

    client.on('disconnect', () => {
        console.log('Usuario desconectado');

        const personaBorrada = usuarios.borrarPersona(client.id);

        client.broadcast.emit('crearMensaje', crearMensaje('Servidor', `${personaBorrada.nombre} salió`));

        client.broadcast.emit('usuariosConectados', usuarios.obtenerPersonas());
    });

    client.emit('crearMensaje', {
        usuario: 'Servidor',
        mensaje: 'Bienvenido a esta aplicación'
    });

    client.on('entrarChat', (data, callback) => {
        if (!data.nombre) {
            return callback({
                error: true,
                mensaje: 'El nombre es necesario'
            });
        }

        const personas = usuarios.agregarPersona(client.id, data.nombre);

        client.broadcast.emit('usuariosConectados', usuarios.obtenerPersonas());

        callback(personas);
    });

    // Mensajes
    client.on('crearMensaje', (data) => {
        const persona = usuarios.obtenerPersona(client.id);
        const mensaje = crearMensaje(persona.nombre, data.mensaje);

        client.broadcast.emit('crearMensaje', mensaje);
    });

    // Mensajes privados
    client.on('mensajePrivado', (data) => {
        const persona = usuarios.obtenerPersona(client.id);

        client.broadcast.to(data.destino).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));
    });
});
