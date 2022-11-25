import nodemailer from 'nodemailer'

const emailRegistro = async (datos) => {

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
        text: 'Confirma tu cuenta en APV',
        html: `<p>Hola: ${nombre}, confirma tu cuenta en APV. </P>
        <P> Tu cuenta ya casi esta lista, solo debes confirmar el siguiente enlace:
        <a href="${process.env.FRONTEND_URL}/confirmar/${token}"> Confirmar cuenta</a> </p>

        <p>Si tu no creaste esta cuenta, puedes desestimar este mensaje </p>
        `
    })

    console.log("Mensaje enviado: %s", info.messageId)
}

export default emailRegistro;