import mongoose from "mongoose";
const PrecioSchema = mongoose.Schema({
    valor: {
        type: String,
        required: true,
    },
    producto: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Producto",
    }],
},{
    timestamps: true
})

const Precio = mongoose.model("Precio", PrecioSchema);
export default Precio;