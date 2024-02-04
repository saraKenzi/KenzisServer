import {getAllOrders,getAllOrdersOfUser,addOrder,deleteOrder,updateOrderStatus} from '../controller/order.js';
import express from "express";
import { auth,authAdmin } from "../middlewares/auth.js";

const orderRouter = express.Router();
orderRouter.get('/',authAdmin,getAllOrders);
orderRouter.get('/byUser', auth,getAllOrdersOfUser);
orderRouter.post('/',auth,addOrder);
orderRouter.put('/:id',authAdmin,updateOrderStatus);
orderRouter.delete('/:id', auth,deleteOrder);

export default orderRouter;
