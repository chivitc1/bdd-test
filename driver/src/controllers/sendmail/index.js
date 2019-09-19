/**
 * @author chinv
 * Handle send email request.
 * Need provide email account, pass, server info,... in request body
 */
import { sendMail } from '../../infrastructure';

const send = (req, res) => {
    const mailAccount = req.body.mailAccount;
    const mailMessage = req.body.mailMessage;
    return sendMail(mailAccount, mailMessage)
        .then(response => {
            res.status(200)
                .json({ "messageId": response });
        })
        .catch(error => {
            res.status(500)
                .json({ "message": error });
        });
}

export default { send };
