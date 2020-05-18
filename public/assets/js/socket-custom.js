const socket = io();

// Escuchar información
socket.on('connect', () => {
    console.log('Conectado al servidor');
});

socket.on('disconnect', () => {
    console.log('Se ha perdido la conexión con el servidor');
});

// Enviar info
socket.emit('enviarMensaje', {
    usuario: 'Ricardo',
    mensaje: 'Hola mundo'
});

// Escuchar info
socket.on('enviarMensaje', (mensaje) => {
    console.log(mensaje);
});
