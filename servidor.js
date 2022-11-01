const express = require('express')

function productos() {
    const fs = require('fs')
    const data = JSON.parse(fs.readFileSync('./productos.txt', 'utf-8'))
    return data
}

function productoRandon() {
    const fs = require('fs')
    const data = JSON.parse(fs.readFileSync('./productos.txt', 'utf-8'))
    const map = data.find(el => getRandomIntInclusive(1, data.length) === el.id)
    return map
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const servidor = express()

servidor.get('/productos',(peticion, respuesta) => {
    respuesta.send(productos())
})

servidor.get('/productoRandon',(peticion, respuesta) => {
    respuesta.send(productoRandon())
})


function conectar(puerto = 0) {
    return new Promise((resolve, reject) => {
        const servidorConectador = servidor.listen(puerto, () => {
            resolve(servidorConectador)
        })
        servidorConectador.on('error', error => reject(error))
    })
}


module.exports = { conectar }


