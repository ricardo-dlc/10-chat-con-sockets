const { io } = require('../server');
const { crearMensaje } = require('../utils/utilidades');

const Usuarios = require('../classes/usuarios');

const usuarios = new Usuarios();

io.on('connection', (client) => {
    console.log('Usuario conectado ');

    client.on('disconnect', () => {
        console.log('Usuario desconectado');

        const personaBorrada = usuarios.borrarPersona(client.id);

        client.broadcast
            .to(personaBorrada.sala)
            .emit('crearMensaje', crearMensaje('Servidor', `${personaBorrada.nombre} salió`));

        client.broadcast
            .to(personaBorrada.sala)
            .emit('usuariosConectados', usuarios.obtenerPersonasPorSala(personaBorrada.sala));
    });

    client.emit('crearMensaje', crearMensaje('Servidor', 'Bienvenido a esta aplicación'));

    client.on('entrarChat', (data, callback) => {
        if (!data.nombre || !data.sala) {
            return callback({
                error: true,
                mensaje: 'El nombre y la sala son necesarios'
            });
        }

        client.join(data.sala);

        usuarios.agregarPersona(client.id, data.nombre, data.sala);

        client.broadcast
            .to(data.sala)
            .emit('crearMensaje', crearMensaje('Servidor', `${data.nombre} se unió`));

        client.broadcast.to(data.sala).emit('usuariosConectados', usuarios.obtenerPersonasPorSala(data.sala));

        callback(usuarios.obtenerPersonasPorSala(data.sala));
    });

    // Mensajes
    client.on('crearMensaje', (data, callback) => {
        const persona = usuarios.obtenerPersona(client.id);
        const mensaje = crearMensaje(persona.nombre, data.mensaje);

        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);

        callback(mensaje);
    });

    // Mensajes privados
    client.on('mensajePrivado', (data) => {
        const persona = usuarios.obtenerPersona(client.id);

        client.broadcast.to(data.destino).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));
    });
});
