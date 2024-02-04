import mongoose from "mongoose";
import Joi from "joi";



const productInOrderSchema = mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    amount: Number
})
const addressSchema = mongoose.Schema({
    city: String,
    street: String,
    streetNum: Number,
    zip: Number,
    apartmentNum: Number,
    floorNum: Number,
})

const orderSchema = mongoose.Schema({
    orderDate: { type: Date, default: Date.now() },
    deliveryDate: Date,
    address: addressSchema,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: [productInOrderSchema],
    isInWay: { type: Boolean, default: false }
})

const Order = mongoose.model('Orders', orderSchema);



const validateProductInOrder = (req_productInOrder) => {
    const schema = Joi.object({
        productId: Joi.string().required(),
        amount: Joi.number().required
    })
    return schema.validate(req_productInOrder);
}

const validateAddress = (req_address) => {
    const schema = Joi.object({
        city: Joi.string().required(),
        street: Joi.string().required(),
        streetNum: Joi.number().required(),
        zip: Joi.number(),
        apartmentNum: Joi.number().required(),
        floorNum: Joi.number()
    })
    return schema.validate(req_address);
}

const orderValidateToAdd = (req_order) => {
    const schema = Joi.object({
        deliveryDate: Joi.date().greater('now').required(),
        products: Joi.array().items().required()
    })
    
    return schema.validate(req_order);
}

export { Order, validateProductInOrder, validateAddress, orderValidateToAdd }

