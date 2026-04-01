import { transport } from "../config/nodemailer";
type AuthEmailProps = {
    name: string;
    email: string;
    token: string;
}

export class AuthEmail {
    static sendConfirmationEmail = async (user: AuthEmailProps) => {
        const email = await transport.sendMail({
            from: 'CashTrackr <admin@cashtrackr.com>',
            to: user.email,
            subject: 'CashTrackr - Confirma tu cuenta',
            html: `
                <p>Hola: ${user.name}, has creado tu cuenta en CashTrackr, ya esta casi lista!</p>
                <p>Visita el siguiente enlace:</p>
                <a href=${process.env.FRONTEND_URL}/auth/confirm-account>Confirmar cuenta</a>
                <p>e ingresa el código: <b>${user.token}</b></p>
            `
        })
        console.log(`Mensaje enviado a: ${email.messageId}`);
    }

        static sendPasswordResetToken = async (user: AuthEmailProps) => {
        const email = await transport.sendMail({
            from: 'CashTrackr <admin@cashtrackr.com>',
            to: user.email,
            subject: 'CashTrackr - Restablece tu password',
            html: `
                <p>Hola: ${user.name}, has solicitado restablecer tu password</p>
                <p>Visita el siguiente enlace:</p>
                <a href=${process.env.FRONTEND_URL}/auth/new-password>Restablecer password</a>
                <p>e ingresa el código: <b>${user.token}</b></p>
            `
        })
        console.log(`Mensaje enviado a: ${email.messageId}`);
    }
}