import { getAllProducts,getProductById,addProduct,deleteProductById,updateProduct,checkNumOfProduct } from "../controller/product.js";
import express from "express";
import { auth, authAdmin } from "../middlewares/auth.js";

const productRouter = express.Router();
productRouter.get('/', getAllProducts);
productRouter.get('/countProduct',checkNumOfProduct);
productRouter.get('/:id', getProductById);
productRouter.post('/',authAdmin, addProduct);
productRouter.put('/:id',authAdmin,updateProduct);
productRouter.delete('/:id', authAdmin, deleteProductById);

export default productRouter;