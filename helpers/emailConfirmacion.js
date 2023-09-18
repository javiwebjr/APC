import nodemailer from 'nodemailer';

const emailConfirmacion = async (datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS
        }
    });
    const {email, nombre, restaurante, token} = datos;

    const info = await transport.sendMail({
        from: "Administracion de Puestos de Comida",
        to: email,
        subject: "Confirma tu cuenta",
        text: "Ingresa para confirmar tu cuenta",
        html: `<h2>Hola ${nombre}, te damos la bienvenida en APC - Administracion de Puestos de Comida</h2>
            <p>Para comenzar a administrar tu negocio primero debes confirmar tu cuenta en el siguiente enlace:
                <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Confirma tu cuenta aqui</a>
            </p>

            <p>Si tu no creaste esta cuenta, porfavor ignora este mensaje</p>
        
        `
    })
}

export default emailConfirmacion;