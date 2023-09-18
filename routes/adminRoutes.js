import express from 'express';
const router = express.Router();
import checkAuth from '../middleware/checkAuth.js';
import { agregarProducto, obtenerProducto, obtenerProduct, eliminarProducto, editarProducto } from '../controllers/adminController.js';



router.route('/').post(checkAuth, agregarProducto).get(checkAuth, obtenerProducto);

router.route('/:id').get(checkAuth, obtenerProduct).put(checkAuth, editarProducto).delete(checkAuth, eliminarProducto);

export default router;