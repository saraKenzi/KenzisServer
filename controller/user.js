import { User, userValidatorForLogin, userValidateToAdd } from "../models/user.js";
import { generateToken } from "../config/generateToken.js";
import { hash, compare } from "bcrypt";

export const addUser = async (req, res) => {
    let validate = userValidateToAdd(req.body);//שליחת פרטי משתמש לבדיקת תקינות
    if (validate.error)
        return res.status(400).json({ type:"error from 'addUser' function", message: validate.error.details[0].message });
    let { userName, password, email,role } = req.body;
    try {
        let sameUser = await User.findOne({ userName, email });
        if (sameUser)
            return res.status(409).json({ type: "כפילות נתונים", message:err.message });
            let hashPassword = await hash(password, 15);
        let newUser = new User({ userName, password: hashPassword, email,role });

        await newUser.save();
        let userToken = generateToken(newUser);
        return res.json({ userToken, userName: newUser.userName, email: newUser.email })

    }
    catch (err) {
        return res.status(400).json({ type: "Error from 'catch'-> 'addUser' function", message: err.message })
    }
}

export const login = async (req, res) => {
    let validate = userValidatorForLogin(req.body);
    if (validate.error)
        return res.status(400).json({ type: "error", message: validate.error.details[0].message });
    try {
        let serchSameUser = await User.findOne({ userName: req.body.userName });
        if (!serchSameUser)
            return res.status(404).json({ type: "NOT FOUND", message: "לא קיים משתמש בשם זה, אנא הרשם למערכת" });
        else if (!await compare(req.body.password, serchSameUser.password))
            return res.status(400).json({ type: "worng password", message: "הסיסמא שהוקשה אינה נכונה" });
        let token = generateToken(serchSameUser);
        return res.json({ token, userName: serchSameUser.userName, email: serchSameUser.email });
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ type: "Error from 'catch'-> 'login' function", message: err.message });
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find({}, "-password");
        res.json(allUsers);
    }
    catch (err) {
        return res.status(400).json({ type: "Error from 'catch'-> 'getAllUsers' function", message: err.message });
    }
}