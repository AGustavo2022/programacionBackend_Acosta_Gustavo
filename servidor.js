const express = require('express');
const { routerApi } = require('./routers/routerApi.js');
const { engine } = require('express-handlebars')

const productos = [];

const app = express();

// middlewares
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

// rutas
app.use('/api/productos', routerApi);


app.get('/', (req, res) => {res.render('index');});
app.get('/productos2', (req, res) => {
    res.render('productos', { productos, hayProductos: productos.length > 0 });
});

app.post('/productos', (req, res) => {
    productos.push(req.body)
    console.log(productos)
    res.redirect('/')
});





function conectar(puerto = 0) {
    return new Promise((resolve, reject) => {
        const servidorConectador = app.listen(puerto, () => {
            resolve(servidorConectador)
        })
        servidorConectador.on('error', error => reject(error))
    })
}

module.exports = { conectar }


