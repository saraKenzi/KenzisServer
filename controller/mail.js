import { User } from "../models/user.js";
import bcrypt from 'bcrypt'; // Import bcrypt for password hashing

import NodeMailer from 'nodemailer';

const transporter = NodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD ,
    },
})

// async..await is not allowed in global scope, must use a wrapper
async function main(email) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"kenzisBakery" <527676896s@gmail.com>', // sender address
        to: email, // list of receivers
        subject: `שלום  `, // Subject line
        text: "בקשתך לאיפוס סיסמא", // plain text body
        html: `<a href="http://localhost:3000/passwordRecovery"><b>לחץ כאן לאיפוס סיסמא </b></a>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

main().catch(console.error);


const checkMail = async (req, res) => {
    try {
        const { email } = req.body;
        const checkMailForUser = await User.find({ email: email })

        if (!checkMailForUser)
            return res.status(404).json({ type: "NOT FOUND", message: err.message });
        main(email);
        return res.json(checkMailForUser);

    }
    catch (err) {
        return res.status(400).json({ type: "Error from 'catch'-> 'checkMail' function ", message: err.message })
    }
}
const passwordRecovery=async (req,res)=>{
    try{
        const user=req.body;
        // let userName=user.userName;
        
        await User.findByIdAndUpdate(id, { password:user.password });

    }
    catch(err){
        return res.status(400).json({ type: "Error from 'catch'-> 'passwordRecovery' function ", message: err.message })

    }
}
export { checkMail,passwordRecovery };