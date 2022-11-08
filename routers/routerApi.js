const express = require('express');

const { 
    productos,
    controladorGetProductosSegunId,
    controladorPostProductos,
    controladorPutProductosSegunId,
    controladorDeleteProductosSegunId 
} = require('../controlles/controladorProductos.js');

const routerApi = express.Router();

routerApi.get('/', productos);
routerApi.get('/:id', controladorGetProductosSegunId);
routerApi.post('/', controladorPostProductos);
routerApi.put('/:id', controladorPutProductosSegunId);
routerApi.delete('/:id', controladorDeleteProductosSegunId);

exports.routerApi = routerApi;