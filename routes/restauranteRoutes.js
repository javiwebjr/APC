import express from 'express';
import { registrar, confirmar, login, resetPassword, comprobarToken, newPassword, admin } from '../controllers/restauranteController.js';
import checkAuth from '../middleware/checkAuth.js';
const router = express.Router();

//sign in
router.post('/', registrar);
router.get('/confirmar/:token', confirmar)

//login
router.post('/login', login);

//forget password
router.post('/reset-password', resetPassword);
router.route('/reset-password/:token').get(comprobarToken).post(newPassword);

//Private - Admin Restaurant
router.get('/admin', checkAuth, admin)

export default router;