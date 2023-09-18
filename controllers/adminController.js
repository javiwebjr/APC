import Producto from "../models/Producto.js";
import Precio from "../models/Precio.js";
import Categoria from "../models/Categoria.js";
import mongoose from "mongoose";

const agregarProducto = async (req, res, next) => {
    const producto = new Producto(req.body);
    producto.usuario = req.usuario._id;
    const categoria = new Categoria(req.body);
    categoria.producto = producto._id;
    const precio = new Precio(req.body);
    precio.producto = producto._id;

    producto.categoria = categoria;
    producto.precio = precio;
    try {
        const productoAgregado = await Promise.all([
            producto.save(),
            categoria.save(),
            precio.save()
        ])
        
        res.json({msg: productoAgregado});
    } catch (error) {
        console.log(error);
    }
    next();
}
const obtenerProducto = async (req, res) => {
    const productos = await Producto.find({}).populate('categoria').populate('precio').where('usuario').equals(req.usuario);
    res.json(productos);
}

const obtenerProduct = async (req, res) => {
    const {id} = req.params;
    const producto = await Producto.findById(id);
    if(!producto){
        return res.status(404).json({msg:"No encontrado"});
    }

    if(producto.usuario._id.toString() !== req.usuario._id.toString()){
        return res.json({msg:"Accion no valida"});
    }
}

const editarProducto = async (req, res) => {
    const {id} = req.params;
    const producto = await Producto.findById(id);
    const categoria = await Categoria.findOne(Categoria.producto).where('producto').equals(producto);
    const precio = await Precio.findOne(Precio.producto).where('producto').equals(producto);
    if(!producto){
        return res.status(404).json({msg:"No encontrado"});
    }
    if(producto.usuario._id.toString() !== req.usuario._id.toString()){
        return res.json({msg:"Accion no valida"});
    }
    producto.nombre = req.body.nombre || producto.nombre;
    categoria.nombreCategoria = req.body.nombreCategoria || categoria.nombreCategoria;
    precio.valor = req.body.valor || precio.valor;

    try {
        const productoActualizado = await Promise.all([
            producto.save(),
            categoria.save(),
            precio.save()
        ])
        res.json(productoActualizado);
    } catch (error) {
        console.log(error);
    }
}

const eliminarProducto = async (req, res) => {
    const {id} = req.params;
    const producto = await Producto.findById(id);
    const categoria = await Categoria.findOne(Categoria.producto).where('producto').equals(producto);
    const precio = await Precio.findOne(Precio.producto).where('producto').equals(producto);
    if(!producto){
        return res.status(404).json({msg:"No encontrado"});
    }

    if(producto.usuario._id.toString() !== req.usuario._id.toString()){
        return res.json({msg:"Accion no valida"});
    }
    try {
        await Promise.all([
            producto.deleteOne(),
            categoria.deleteOne(),
            precio.deleteOne()
        ])
        res.json({msg:"Producto Eliminado"})
    } catch (error) {
        console.log(error);
    }
}

export {
    agregarProducto,
    obtenerProducto,
    obtenerProduct,
    eliminarProducto,
    editarProducto
}