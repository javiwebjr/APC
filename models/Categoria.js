import mongoose from "mongoose";

const CategoriaSchema = mongoose.Schema({
    nombreCategoria: {
        type: String,
        required: true,
    },
    producto: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Producto",
    }]
}, {
    timestamps: true,
})

const Categoria = mongoose.model("Categoria", CategoriaSchema);
export default Categoria;