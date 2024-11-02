
const moduleCLUB = require('../model/club');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;


async function createTransporter()
{
    return nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'pat73@ethereal.email',
            pass: '33qRSrwNb3phXBeZMD'
        }
    });
}

const ClubController =
{
     new_club : async (req,res) =>
    {
        try
        {
            const {name,read_time,members,firstBook} = req.body;


            const newCLub = await moduleCLUB.insert_new_one(name,read_time,members,firstBook);

            if(!newCLub)
            {
                res.status(400).json('error to get a club');
                return;
            }

            const transporter = await createTransporter();
            for(const member of members)
            {
                const token = jwt.sign({email: member.email, clubId : newCLub}, SECRET_KEY, { expiresIn: '3h' });

                let mailOptions = {
                    from: `"Event Organizer" <${transporter.options.auth.user}>`,
                    to: member.email,
                    subject: `Welcome to the Clubd!`,
                    text: `Hello your member club is: ${token}`
                };
                await transporter.sendMail(mailOptions);
            }

            return res.status(200).json('club created successfully');
        }
        catch (error)
        {
            console.log(error);
            res.status(500).json({ message: 'Error', error: { message: error.message } });
        }

    },

    new_review : async (req,res) =>
    {
        try
        {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ message: 'Token missing or invalid' });
            }
            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, SECRET_KEY);

            const clubId =  decoded.clubId;
            const memberEmail = decoded.email;


            const {content} = req.body;

            const review = await moduleCLUB.insert_new_review(clubId,memberEmail,content);

            if(!review)
            {
                res.status(400).json('error to get a review');
                return;
            }

            return res.status(200).json('review created successfully');
        }
        catch (error)
        {
            console.log(error);
            res.status(500).json({ message: 'Error', error: { message: error.message } });
        }
    },


    new_book : async (req,res) =>
    {
        try
        {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ message: 'Token missing or invalid' });
            }
            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, SECRET_KEY);

            const clubId =  decoded.clubId;
            const memberEmail = decoded.email;

            const {name,description} = req.body;

            const newBook = await  moduleCLUB.insert_new_book(clubId,name,description);

            if(!newBook)
            {
                res.status(400).json('error to get a book');
                return;
            }
            return res.status(200).json('book created successfully');
        }
        catch (error)
        {
            console.log(error);
            res.status(500).json({ message: 'Error', error: { message: error.message } });
        }
    }





}

module.exports = ClubController;