import { Resend } from 'resend';
const { email } = useRuntimeConfig()

const resend = new Resend(email.key);

export const useMailer = async (options: { recepient: string, subject: string, body: any }) => {
    const { recepient, subject, body } = options

    const response: any = {
        success: null,
        error: null
    }

    const mailOptions = {
        from: email.sender,
        to: recepient,
        subject: subject,
        html: body,
    }

    const { data, error } = await resend.emails.send(mailOptions);

    if (error) {
        console.error('Email not sent:', {
            message: error.message,
            name: error.name,
            code: error.statusCode,
        });

        response.success = false;
        response.error = error;
    }

    else {
        console.log('Email sent:', { id: data.id, });
        response.success = true;
    }

    return response
}
