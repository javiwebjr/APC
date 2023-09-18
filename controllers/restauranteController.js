import Usuario from "../models/Usuario.js";
import generarJWT from "../helpers/generarJWT.js";
import emailConfirmacion from "../helpers/emailConfirmacion.js";
import emailResetPassword from "../helpers/emailResetPassword.js";
import generarId from "../helpers/generarId.js";

const registrar = async (req, res) => {
    const {nombre, email, password, restaurante} = req.body;

    //Validation
    const existeUsuario = await Usuario.findOne({email});

    if(existeUsuario){
        const error = new Error('Este email ya esta registrado');
        return res.status(400).json({msg: error.message});
    }

    try {
        //Sign in new user
        const usuario = new Usuario(req.body);
        const usuarioGuardado = await usuario.save();

        emailConfirmacion({
            email, nombre, restaurante, token: usuarioGuardado.token
        })
        res.json(usuarioGuardado);

    } catch (error) {
        console.log(error);
    }
}

const confirmar = async (req, res) => {
    const {token} = req.params;

    const usuarioConfirmado = await Usuario.findOne({token});
    if(!usuarioConfirmado){
        const error = new Error('Token no valido');
        return res.status(404).json({msg: error.message});
    }
    try {
        usuarioConfirmado.token = null;
        usuarioConfirmado.confirmado = true;
        await usuarioConfirmado.save();
        res.json({msg:"Usuario confirmado correctamente"});
    } catch (error) {
        console.log(error);
    }
}

const login = async (req, res) => {
    const {email, password} = req.body;

    //Validation if user exist
    const usuario = await Usuario.findOne({email});
    if(!usuario){
        const error = new Error('Este usuario no existe');
        return res.status(404).json({msg: error.message});
    }
    //Verify if user is confirmed
    if(!usuario.confirmado){
        const error = new Error('Esta cuenta no ha sido confirmada');
        return res.status(403).json({msg: error.message});
    }

    //check password
    if(await usuario.comprobarPassword(password)){
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario.id),
        });
    }else{
        const error = new Error('El password es incorrecto');
        return res.status(403).json({msg: error.message});
    }

}

const resetPassword = async (req, res) => {
    const {email} = req.body;

    const existeUsuario = await Usuario.findOne({email});
    if(!existeUsuario){
        const error = new Error('Este usuario no existe');
        return res.status(404).json({msg: error.message});
    }
    try {
        //generate token to validate email send and user can change their password
        existeUsuario.token = generarId();
        await existeUsuario.save();
        //send email reset password
        emailResetPassword({
            email,
            nombre: existeUsuario.nombre,
            token: existeUsuario.token
        });
        res.json({msg: "Te Hemos Enviado Un Email Con Las Intrucciones"})

    } catch (error) {
        console.log(error);
    }
}
const comprobarToken = async (req, res) => {
    const {token} = req.params;
    const checkToken = await Usuario.findOne({token});
    if(checkToken){
        res.json({msg: "Token Valido"});
    }else{
        const error = new Error("Token No Valido");
        return res.status(400).json({msg: error.message});
    }
}

const newPassword = async (req, res)=> {
    const {token} = req.params;
    const {password} = req.body;

    const usuario = await Usuario.findOne({token});
    if(!usuario){
        const error = new Error("Hubo un error");
        return res.status(404).json({msg: error.message});
    }
    try {
        usuario.token = null;
        usuario.password = password;
        await usuario.save();
        res.json({msg: "Tu Password Ha Sido Modificado Correctamente"})
    } catch (error) {
        console.log(error);
    }
}

const admin = async (req, res) => {
    const {usuario} = req;
    res.json(usuario);
}

export {
    registrar,
    confirmar,
    login,
    resetPassword,
    comprobarToken,
    newPassword,
    admin
}