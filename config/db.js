import mongoose from "mongoose";

const connectionDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const url = `${db.connection.host}:${db.connection.port}`
        console.log(`Base de datos conectada: ${url}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectionDB;