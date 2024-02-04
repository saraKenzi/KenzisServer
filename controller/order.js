import mongoose, { isValidObjectId } from "mongoose";
import { Order, validateProductInOrder, validateAddress, orderValidateToAdd } from "../models/order.js";

const getAllOrders = async (req, res) => {
    try {
        const allOrders = await Order.find({});
        if (!allOrders)
            return res.status(404).json({ type: "NOT FOUND", message: "you don't have orders yet" });
        return res.json(allOrders);
    }
    catch (err) {
        return res.status(400).json({ type: "Error from 'catch'-> 'getAllOrders' function ", message: err.message })
    }
}

const getAllOrdersOfUser = async (req, res) => {
    try {
        let { userId } = req.userToken;
        let ordersOfUser = await Order.find({ userId });
        if (ordersOfUser.length == 0)
            return res.status(404).json({ type: "NOT FOUND", message: "this user don't have orders yet" });
        return res.json(ordersOfUser);
    }
    catch (err) {
        return res.status(400).json({ type: "Error from 'catch'-> 'getAllOrdersOfUser' function ", message: err.message })
    }
}

const addOrder = async (req, res) => {
    try {
        let token = req.userToken;
        let order = req.body;
        order.deliveryDate = new Date(order.deliveryDate);
        let address = validateAddress(order.address);
        if (address.error)
            return res.status(400).json({ type: "error", message: address.error.details[0].message });
        let validateOrder = orderValidateToAdd({ products: order.products, deliveryDate: order.deliveryDate });
        if (validateOrder.error)
            return res.status(400).json({ type: "error", message: validateOrder.error.details[0].message });
        validateOrder = validateOrder.value;
        validateOrder.userId = token.userId;
        validateOrder.address = address.value;
        let newOrder = await Order.create(validateOrder);
        return res.json(newOrder);
    }
    catch (err) {
        return res.status(400).json({ type: "Error from 'catch'-> 'addOrder' function ", message: err.message })
    }
}

const deleteOrder = async (req, res) => {
    try {
        let id = req.params.id;
        if (!isValidObjectId(id))
            return res.status(400).json({ type: "invalid id", message: "invalid order id" });
        let orderUser = await Order.findById(id);
        if (!orderUser)
            return res.status(404).json({ type: "NOT FOUND!", message: "order to delete not found" });

        if (req.userToken.role != 'ADMIN' && req.userToken.userId != orderUser.userId)
            return res.status(403).json({ type: "אין הרשאה", message: "delete order function forbbiden for the user" });
        if (orderUser.isInWay)
            return res.status(400).json({ type: "ההזמנה יצאה כבר לדרך", message: "the order isInWay" });
        let deletOrder = await Order.findByIdAndDelete(id);
        return res.json(deletOrder);
    }
    catch (err) {
        return res.status(400).json({ type: "Error from 'catch'-> 'deletOrder' function ", message: err.message })
    }
}
const updateOrderStatus = async (req, res) => {
    try{
    let { id } = req.params;
    if (!isValidObjectId(id))
        return res.status(400).json({ type: "error", message: "id invalid" });
    let order = await Order.findById(id);
    if (!order)
        return res.status(404).json({ type: "NOT FOUND", message: "not found order by id" });
    await Order.findByIdAndUpdate(id, { isInWay: true });
    let updatedOrder = await Order.findById(id);
    res.json(updatedOrder);
    }
    catch (err) {
        return res.status(400).json({ type: "Error from 'catch'-> 'updateOrderStatus' function ", message: err.message })
    }
}

export { getAllOrders, getAllOrdersOfUser, addOrder, deleteOrder,updateOrderStatus };
