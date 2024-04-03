import mongoose from "mongoose";
import Joi from "joi";

const productSchema = mongoose.Schema({
    productName: String,
    description: String,
    heatOrCoolInstructions: String,
    allergens: String,
    price: Number,
    madeInDate: { type: Date, default: Date.now() },
    imgUrl: [String],
    category: String
});


export const Product = mongoose.model("Product", productSchema);

export const productValidateToAdd = (checkProduct) => {
    const schema = Joi.object({
        productName: Joi.string().max(30).required(),
        allergens: Joi.string().min(5).required(),
        price: Joi.number().min(10).max(350).required(),
        imgUrl: Joi.array().items(Joi.string()).required(), 
        description: Joi.string().min(12),
        heatOrCoolInstructions: Joi.string().min(12).max(100),
        madeInDate: Joi.date(),
        category: Joi.string().valid('cakes', 'dessert', 'sweets').required()
    })
    return schema.validate(checkProduct);
}
export const productValidateToUpdate = (checkProduct) => {
    const schema = Joi.object({
        productName: Joi.string().max(30),
        price: Joi.number().min(10).max(350),
        allergens: Joi.string().min(5),
        description: Joi.string().min(12),
        heatOrCoolInstructions: Joi.string().min(12).max(100),
        madeInDate: Joi.date(),
        imgUrl: Joi.array().items(Joi.string()), 
        category: Joi.string().valid('cakes','sweets', 'dessert')

    })
    return schema.validate(checkProduct);
}