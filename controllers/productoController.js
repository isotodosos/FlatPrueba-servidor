const Producto = require('../models/Producto');
const { validationResult } = require('express-validator');





exports.mostrarProductos = async (req,res) => {

    try {
        const productos = await Producto.find();
        //console.log(productos);
        return res.status(200).json({productos});

    } catch (error) {
        return res.status(500).json({msg : error});
    }
}


exports.crearProducto = async (req,res) => {
    
    const { nombre , precio, descripcion} = req.body;

    try {

        // revisar si hay errores
        const errores = validationResult(req)//si validationResult() encuentra errores en la req, llenará un array en const errores
        if(!errores.isEmpty()){
            return res.status(400).json({ errores: errores.array() });
        }

        // creamos el producto, lo guardamos y lo devolvemos como respuesta (de momento)
        let producto = new Producto(req.body);
        
        
        await producto.save();
        return res.status(200).json({producto});
         
                 
        
        
    } catch (error) {
        return res.status(400).send('Algo no ha funcionado');
    }
    
}


exports.actualizaProducto = async (req, res) => {
    
    //console.log(req.body);
    const { _id, nombre, precio, descripcion } = req.body;

    try {

        let producto = await Producto.findById(_id);
        //console.log(producto);
        if(!producto){
            return res.status(404).json({msg : 'El producto no existe'})
        }

        let nuevoproducto = {}
        nuevoproducto.nombre = nombre;
        nuevoproducto.precio = precio;
        nuevoproducto.descripcion = descripcion;
        
        //console.log(nuevoproducto);
        producto = await Producto.findOneAndUpdate({_id : _id}, {$set : nuevoproducto}, {new : true});
        //console.log(producto)
        return res.status(200).json({producto});


        
    } catch (error) {
        return res.status(500).json({msg : error});
    }
}


exports.borrarProducto = async (req,res) => {

    const productoId = req.params.id;

    try {
        const producto = await Producto.findByIdAndDelete(productoId);
        return res.status(200).json({producto});

        
    } catch (error) {
        return res.status(500).json({msg : error});
    }

}


