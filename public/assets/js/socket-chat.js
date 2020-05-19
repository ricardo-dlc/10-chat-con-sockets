const socket = io();

const params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre o la sala son necesarios');
}

const usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};

// Escuchar información
socket.on('connect', () => {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, (res) => {
        console.log(res);
        if (res.error) {
            window.location = 'index.html';
            throw new Error('El nombre y la sala son necesarios');
        }

        console.log('Usuarios conectados', res);
    });
});

socket.on('disconnect', () => {
    console.log('Se ha perdido la conexión con el servidor');
});

// Escuchar info
socket.on('crearMensaje', (mensaje) => {
    console.log(mensaje);
});

// Escuchar eventos de des/conexión
socket.on('usuariosConectados', (usuarios) => {
    console.log(usuarios);
});

// Mensajes privados
socket.on('mensajePrivado', (mensaje) => {
    console.log('Mensaje Privado:', mensaje);
});
