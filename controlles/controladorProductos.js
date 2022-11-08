
const { randomUUID } = require('crypto');

function productos () {
    const fs = require('fs')
    const data = JSON.parse(fs.readFileSync('./productos.txt', 'utf-8'))
    return data
}

const producto = productos()

function controladorGetProducto(req, res) {
    const data = producto
    data.map(e => {e.id=randomUUID()})
    res.status(201)
    res.json(data)
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


exports.controladorGetProducto = controladorGetProducto;
exports.controladorGetProductosSegunId = controladorGetProductosSegunId;
exports.controladorPostProductos = controladorPostProductos;
exports.controladorPutProductosSegunId = controladorPutProductosSegunId;
exports.controladorDeleteProductosSegunId = controladorDeleteProductosSegunId;