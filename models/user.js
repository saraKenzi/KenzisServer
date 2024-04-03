import mongoose from "mongoose";
import Joi from "joi";

const userSchema = mongoose.Schema({
    userId: String,
    userName: String,
    password: String,
    email: String,
    role: { type: String, default: "user" },
    startEnterDate: { type: Date, default: Date.now }});


export const User = mongoose.model("users", userSchema);

export const userValidateToAdd = (checkUser) => {
    const schema = Joi.object({
        // userId: Joi.string().min(9).max(9),
        userName: Joi.string().min(3).max(20).required(),
        password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).required(),
        email: Joi.string().email().message("אימייל לא חוקי").required(),
        // role: Joi.string().valid('admin', 'user').insensitive(),
        startEnterDate: Joi.date()
    });
    return schema.validate(checkUser);
}
export const userValidatorForLogin = (checkUser) => {
    const schema = Joi.object({
        userName: Joi.string().min(3).max(20).required(),
        password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).required(),
    });
    return schema.validate(checkUser);
}