import nodemailer from 'nodemailer';

const emailResetPassword = async (datos) => {
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
        subject: "Solicitaste Un Cambio de Password",
        text: "Haz solicitado cambiar tu password",
        html: `<h2>Hola ${nombre}, haz solicitado un cambio de password</h2>
            <p>Para cambiar el password de tu cuenta sigue las indicaciones del siguiente enlace:
                <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer Password</a>
            </p>

            <p>Si tu no solicitaste un cambio de password, porfavor ignora este mensaje</p>
        
        `
    })
}

export default emailResetPassword;