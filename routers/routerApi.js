const express = require('express');

const { 
    controladorGetProducto,
    controladorGetProductosSegunId,
    controladorPostProductos,
    controladorPutProductosSegunId,
    controladorDeleteProductosSegunId 
} = require('../controlles/controladorProductos.js');

const routerApi = express.Router();

routerApi.get('/', controladorGetProducto);
routerApi.get('/:id', controladorGetProductosSegunId);
routerApi.post('/', controladorPostProductos);
routerApi.put('/:id', controladorPutProductosSegunId);
routerApi.delete('/:id', controladorDeleteProductosSegunId);




exports.routerApi = routerApi;