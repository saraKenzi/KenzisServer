import { User, userValidatorForLogin, userValidateToAdd } from "../models/user.js";
import { generateToken } from "../config/generateToken.js";
import { compare } from "bcrypt";
import bcrypt from 'bcrypt'; // Import bcrypt for password hashing


export const addUser = async (req, res) => {
    let validate = userValidateToAdd(req.body);
    if (validate.error)
        return res.status(400).json({ type:validate.error.details[0].message,message:"שגיאה בולידציה להוספת משתמש חדש" });

    let { userName, password, email } = req.body;

    try {
        const sameUser = await User.findOne({  email });
        if (sameUser)
            return res.status(409).json({ type: "כפילות נתונים", message: 'אימייל זה כבר קיים במערכת'});
        let hashPassword = await bcrypt.hash(password, 15);

        let newUser = new User({ userName, password: hashPassword, email });

        await newUser.save();

        let userToken = generateToken(newUser);

        return res.json({ userToken, userName: newUser.userName, email: newUser.email, role: newUser.role })

    }
    catch (err) {
        return res.status(400).json({ type: err.message,message:"שגיאה כללית: אין אפשרות להוסיף משתמש זה" })
    }
}

export const login = async (req, res) => {
    let validate = userValidatorForLogin(req.body);
    if (validate.error)
        return res.status(400).json({ type: validate.error.details[0].message,message:"שגיאה בולידציה של כניסת משתמש" });
    try {
        let serchSameUser = await User.findOne({ userName: req.body.userName });//גם המייל אמור להיות זהה
        if (!serchSameUser)
            return res.status(404).json({ type: "לאא נמצא!", message: "לא קיים משתמש בשם זה, אנא הרשם למערכת" });
        else if (!await compare(req.body.password, serchSameUser.password))
            return res.status(400).json({ type: "סיסמא שגויה!", message: "הסיסמא שהוקשה אינה נכונה" });
        let token = generateToken(serchSameUser);
        return res.json({ token, userName: serchSameUser.userName, email: serchSameUser.email, role: serchSameUser.role });
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ type: err.message,message:"שגיאה כללית: אין אפשרות למשתמש זה להתחבר" });
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find({}, "-password");
        return res.json(allUsers);
    }
    catch (err) {
        return res.status(400).json({ type: err.message,message:"שגיאה כללית: אין אפשרות לצפות ברשימת כל המשתמשים הרשומים לאתר" });
    }
}