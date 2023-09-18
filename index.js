import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectionDB from './config/db.js';
import restauranteRoutes from './routes/restauranteRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();
app.use(express.json());

dotenv.config();
connectionDB();

// Domains allowed
const dominios = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: function(origin, callback){
        if(dominios.indexOf(origin)!== -1){
            callback(null, true)
        }else{
            callback(new Error ('No permitido por Cors'))
        }
    }
}
app.use(cors(corsOptions));

app.use('/api/restaurante', restauranteRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto: ${PORT}`);
});