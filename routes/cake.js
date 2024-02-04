import { addCakes, getAllCakes, getCakeById, deleteCakeById,updateCake } from "../controller/cake.js";
import express from "express";
import { auth, authAdmin } from "../middlewares/auth.js";

const cakeRouter = express.Router();
cakeRouter.get('/', getAllCakes);
cakeRouter.get('/:id', getCakeById);
cakeRouter.post('/', authAdmin, addCakes);
cakeRouter.put('/:id',authAdmin,updateCake);
cakeRouter.delete('/:id', authAdmin, deleteCakeById);


export default cakeRouter;