import mongoose from "mongoose";
import generarId from "../helpers/generarId.js";

const ProductoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
    },
    categoria: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categoria",
    }],
    precio: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Precio",
    }],
}, {
    timestamps: true,
})

const Producto = mongoose.model("Producto", ProductoSchema);
export default Producto;