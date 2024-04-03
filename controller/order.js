import { isValidObjectId } from "mongoose";
import { Order, validateAddress, orderValidateToAdd } from "../models/order.js";

const getAllOrders = async (req, res) => {
    try {
        const allOrders = await Order.find({});
        if (!allOrders)
            return res.status(404).json({ type: "לא נמצא!", message: "עוד לא קנו אצלך שום קניה!" });
        return res.json(allOrders);
    }
    catch (err) {
        return res.status(400).json({ type: err.message, message: "שגיאה כללית: לא ניתן להציג את כל ההזמנות" })
    }
}

const getAllOrdersOfUser = async (req, res) => {
    try {
        let { userId } = req.userToken;
        let ordersOfUser = await Order.find({ userId });
        if (ordersOfUser.length == 0)
            return res.status(404).json({ type: "לא נמצא!", message: " לא קיימות הזמנות למשתמש זה" });
        return res.json(ordersOfUser);
    }
    catch (err) {
        return res.status(400).json({ type: err.message, message: "שגיאה כללית: לא ניתן להציג הזמנות למשתמש זה" })
    }
}

const addOrder = async (req, res) => {
    try {
        let token = req.userToken;
        let order = req.body;
        order.deliveryDate = new Date(order.deliveryDate);
        let address = validateAddress(order.address);
        if (address.error)
            return res.status(400).json({ type: address.error.details[0].message, message: "שגיאה בכתובת למשלוח" });
        let validateOrder = orderValidateToAdd({ products: order.products, deliveryDate: order.deliveryDate });
        if (validateOrder.error)
            return res.status(400).json({ type:validateOrder.error.details[0].message , message:"שגיאה בפרטי ההזמנה"  });
        validateOrder = validateOrder.value;
        validateOrder.userId = token.userId;
        validateOrder.address = address.value;
        let newOrder = await Order.create(validateOrder);
        return res.json(newOrder);
    }
    catch (err) {
        return res.status(400).json({ type: err.message, message: "שגיאה כללית: לא ניתן להוסיף הזמנה זו" })
    }
}

const deleteOrder = async (req, res) => {
    try {
        let id = req.params.id;
        if (!isValidObjectId(id))
            return res.status(400).json({ type: "חוסר תקינות במזהה הזמנה", message: "קוד הזמנה לא תקין" });
        let orderUser = await Order.findById(id);
        if (!orderUser)
            return res.status(404).json({ type: "לא נמצא!", message: "לא נמצאה הזמנה למחיקה" });

        if (req.userToken.role != 'ADMIN' && req.userToken.userId != orderUser.userId)
            return res.status(403).json({ type: "בעיית הרשאה", message: "אין לך הרשאה למחוק הזמנה" });
        if (orderUser.isInWay)
            return res.status(400).json({ type: "ההזמנה יצאה כבר לדרך", message: "אין אפשרות למחוק הזמנה שיצאה לדרך" });
        let deletOrder = await Order.findByIdAndDelete(id);
        return res.json(deletOrder);
    }
    catch (err) {
        return res.status(400).json({ type: err.message, message: "שגיאה כללית: לא ניתן למחוק הזמנה זו" })
    }
}
const updateOrderStatus = async (req, res) => {
    try {
        let { id } = req.params;
        if (!isValidObjectId(id))
            return res.status(400).json({ type: "חוסר תקינות במזהה הזמנה", message: "קוד הזמנה לא חוקי" });
        let order = await Order.findById(id);
        if (!order)
            return res.status(404).json({ type: "לא נמצא!", message: "לא נמצאה הזמנה עם קוד זה" });
        await Order.findByIdAndUpdate(id, { isInWay: true });
        let updatedOrder = await Order.findById(id);
        return res.json(updatedOrder);
    }
    catch (err) {
        return res.status(400).json({ type:err.message, message: "שגיאה כללית: לא ניתן לעדכן הזמנה זו!" })
    }
}

export { getAllOrders, getAllOrdersOfUser, addOrder, deleteOrder, updateOrderStatus };
