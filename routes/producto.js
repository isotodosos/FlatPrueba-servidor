const express = require ('express');
const router = express.Router();

const productoController = require('../controllers/productoController');
const { check } = require('express-validator');





//Su endpoint va a ser: api/producto

//Obtener todos los productos
router.get('/catalogo',
productoController.mostrarProductos)

//Guardar un producto
router.post('/crear-producto',[
    check('nombre', 'Escribe el nombre del producto').not().isEmpty(),    
    check('precio', 'Escribe el precio del producto').not().isEmpty(),
    check('descripcion', 'Escribe la descripcion del producto').not().isEmpty()
    ],
productoController.crearProducto);

// Actualizar Producto
router.put('/actualizar/:id',
productoController.actualizaProducto);

// Borrar un producto
router.delete('/borrar/:id',
productoController.borrarProducto);


module.exports = router;

