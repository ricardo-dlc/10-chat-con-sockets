const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const http = require('http');

const app = express();
const server = http.createServer(app);

module.exports.io = socketIO(server);
require('./sockets/socket');

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 8002;

app.use(express.static(publicPath));

server.listen(port, (err) => {
    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${port}`);
});
