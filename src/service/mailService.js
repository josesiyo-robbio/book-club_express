


const nodemailer    = require("nodemailer");
const jwt           =   require('jsonwebtoken');
const SECRET_KEY    =   process.env.SECRET_KEY;

async function createTransporter()
{
    return nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        }
    });
}



const sendWelcomeEmails = async (members, clubId) => 
{
    const transporter = await createTransporter();
    const emailPromises = members.map(member => {
        const token = jwt.sign({ email: member.email, clubId }, SECRET_KEY, { expiresIn: '3h' });
        
        const mailOptions = {
            from: `"Event Organizer" <${transporter.options.auth.user}>`,
            to: member.email,
            subject: 'Welcome to the Club!',
            text: `Hello! Your membership token for the club is: ${token}`
        };
        
        return transporter.sendMail(mailOptions);
    });
    
    await Promise.all(emailPromises);
};



module.exports = {createTransporter,sendWelcomeEmails};