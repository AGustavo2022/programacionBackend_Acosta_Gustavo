
const { randomUUID } = require('crypto');

const producto = productos()

function productos() {
    const fs = require('fs')
    const data = JSON.parse(fs.readFileSync('./productos.txt', 'utf-8'))
    data.map(e => {e.id=randomUUID()})
    return data
}

function controladorGetProductosSegunId({ params: {id } }, res) {
    const buscado = producto.find(c => c.id === id);
    if (!buscado) {
        res.status(404);
        res.json({ error: `Producto no encontrado (${id})`});
    } else {
        res.json(buscado);
    }
}

function controladorPostProductos(req, res) {
    const productoNuevo = req.body;
    productoNuevo.id = randomUUID();
    producto.push(productoNuevo);
    res.status(201);
    res.json(productoNuevo);
}

function controladorPutProductosSegunId({ body, params: { id } }, res) {
    const indiceBuscado = producto.findIndex(c => c.id === id );
    if (indiceBuscado === -1) {
        res.status(404);
        res.json({ error: `Producto no encontrado (${id})`});
    } else {
        producto[indiceBuscado] = body;
        res.json(body);
    }
}

function controladorDeleteProductosSegunId({ params: { id } }, res) {
    const indiceBuscado = producto.findIndex(c => c.id === id);
    if (indiceBuscado === -1) {
        res.status(404);
        res.json({ error: `Producto no encontrado (${id})`});
    } else {
        const borrados = producto.splice(indiceBuscado, 1);
        res.sendStatus(204)
        res.json(borrados[0]);
    }
}


exports.productos = productos;
exports.controladorGetProductosSegunId = controladorGetProductosSegunId;
exports.controladorPostProductos = controladorPostProductos;
exports.controladorPutProductosSegunId = controladorPutProductosSegunId;
exports.controladorDeleteProductosSegunId = controladorDeleteProductosSegunId;