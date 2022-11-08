const express = require('express');
const { routerApi } = require('./routers/routerApi.js');

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// rutas
app.use('/api/productos', routerApi);

function conectar(puerto = 0) {
    return new Promise((resolve, reject) => {
        const servidorConectador = app.listen(puerto, () => {
            resolve(servidorConectador)
        })
        servidorConectador.on('error', error => reject(error))
    })
}

module.exports = { conectar }


