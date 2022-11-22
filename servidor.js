const express = require('express');

const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express();
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const productos = [];

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

//configuracion de socket

io.on('connection', socket => {

    socket.emit('personas', productos);

    socket.on('update', producto => {
        productos.push(producto)
        io.sockets.emit('productos', productos);
    })
});

//inicio servidor

function conectar(puerto = 0) {
    return new Promise((resolve, reject) => {
        // const servidorConectador = app.listen(puerto, () => {
        const servidorConectador = httpServer.listen(puerto, () => {
            resolve(servidorConectador)
        })
        servidorConectador.on('error', error => reject(error))
    })
}

module.exports = { conectar }


