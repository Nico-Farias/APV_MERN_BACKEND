import nodemailer from 'nodemailer'


const emailOlvidePassword = async (datos) => {

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const { email, nombre, token } = datos;

    //Enviar el email

    const info = await transporter.sendMail({
        from: "APV  - Administrador de paciente de veterinaria",
        to: email,
        subject: 'Confirma tu cuenta en APV',
        text: 'Restablece tu password',
        html: `<p>Hola: ${nombre}, has solicitado reestablecer tu password. </P>
        <P> Sigue el siguiente enlace para reestablecer tu password:
        <a href="${process.env.FRONTEND_URL}/olvidePassword/${token}"> Restablece tu password</a> </p>

        
        `
    })

    console.log("Mensaje enviado: %s", info.messageId)
}

export default emailOlvidePassword;