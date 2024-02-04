import mongoose from "mongoose";
import Joi from "joi";

const cakeSchema = mongoose.Schema({
    cakeName: String,
    description: String,
    heatOrCoolInstructions: String,
    allergens: String,
    price: Number,
    madeInDate: { type: Date, default: Date.now() },
    imgUrl: String
});


export const Cake = mongoose.model("cakes", cakeSchema);

export const cakeValidateToAdd = (checkCake) => {
    const schema = Joi.object({
        cakeName: Joi.string().min(5).max(30).required(),
        allergens: Joi.string().min(5).max(50).required(),
        price: Joi.number().min(30).max(350).required(),
        imgUrl:Joi.string().required(),
        description:Joi.string().min(12).max(100),
        heatOrCoolInstructions:Joi.string().min(12).max(100),
        madeInDate: Joi.date()
    })
    return schema.validate(checkCake);
}
export const cakeValidateToUpdate = (checkCake) => {
    const schema = Joi.object({
        cakeName: Joi.string().min(5).max(30),
        allergens: Joi.string().min(5).max(50).required(),
        price: Joi.number().min(30).max(350).required(),
        imgUrl:Joi.string(),
        description:Joi.string().min(12).max(100),
        heatOrCoolInstructions:Joi.string().min(12).max(100),
        madeInDate: Joi.date()
    })
    return schema.validate(checkCake);
}