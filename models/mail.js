import mongoose from "mongoose";
import Joi from "joi";

const mailSchema = mongoose.Schema({

    email: String
})

export const Mail = mongoose.model("mail", mailSchema);

export const mailValidateToCheck = (checkMail) => {
    const schema = Joi.object({
        email: Joi.string().email().message("אימייל לא חוקי").required(),
    });
    return schema.validate(checkMail);
}

export { Mail ,mailValidateToCheck};
