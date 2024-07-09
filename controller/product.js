import mongoose, { isValidObjectId } from "mongoose";
import { Product, productValidateToAdd, productValidateToUpdate } from "../models/product.js"


const getAllProducts = async (req, res) => {

    let page = req.query.page || 1;
    let perPage = req.query.perPage || 10;
    let { search } = req.query;
    try {
        let filter = {};
        if (search) {
            filter.name = new RegExp(search, 'i');
        }

        const allProduct = await Product.find(filter)
            .skip((page - 1) * perPage)
            .limit(perPage);

        return res.json(allProduct);
    } catch (err) {
        return res.status(500).json({ type: err.message, message: "שגיאה כללית: לא ניתן להציג את כל המוצרים" });
    }
};


const getProductById = async (req, res) => {
    try {
        let { id } = req.params;
        if (!mongoose.isValidObjectId)
            return res.status(400).json({ type: "חוסר תקינות במזהה מוצר", message: "מזהה מוצר לא חוקי" });
        let product = await Product.findById(id);
        if (!product)
            return res.status(404).json({ type: "לא נמצא!", message: "לא קיים מוצר עם קוד זה" });
        return res.json(product);
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ type: err.message, message: "שגיאה כללית: לא ניתן להציג מוצר זה" });
    }
}

const addProduct = async (req, res) => {
    try {
        let validateResult = productValidateToAdd(req.body);
        if (validateResult.error)
            return res.status(404).json({ type: validateResult.error.details[0].message, message: "חסר פרמטרים", });
        let { productName, price } = req.body;
        let sameProduct = await Product.findOne({ productName, price });
        if (sameProduct)
            return res.status(409).json({ type: "כפילות נתונים", message: "קיים מוצר בשם ובמחיר זה!!" });
        let newProduct = await Product.create(validateResult.value);
        return res.json(newProduct);
    }
    catch (err) {
        return res.status(400).json({ type: err.message, message: "שגיאה כללית: הוספת מוצר נכשלה" })
    }
}

const deleteProductById = async (req, res) => {
    try {
        let { id } = req.params;
        if (!mongoose.isValidObjectId(id))
            res.status(400).json({ type: "שגיאת מזהה מוצר", message: "קוד מוצר לא תקין!" });
        const findProduct = await Product.findById(id);
        if (!findProduct)
            res.status(404).json({ type: "לא נמצא! ", message: " לא נמצא מוצר עם הקוד שנשלח " });
        const deleted = await Product.findByIdAndDelete(id);
        return res.json(deleted);
    }
    catch (err) {
        return res.status(400).json({ type: err.message, message: "שגיאה כללית: לא ניתן למחוק מוצר זה" })
    }


}
const updateProduct = async (req, res) => {
    try {
        let { id } = req.params;
        if (!isValidObjectId(id))
            return res.status(400).json({ type: "חוסר תקינות במזהה מוצר", message: "מזהה מוצר לא תקין" });

        let searchProduct = Product.findById({ id });
        if (!searchProduct)
            return res.status(404).json({ type: "לא נמצא!", message: "לא נמצא מוצר עם קוד זה" });

        let product = req.body;
        let checkProduct = productValidateToUpdate(product);
        if (checkProduct.error)
            return res.status(400).json({ type: checkProduct.error.details[0].message, message: "בעיה בולידצית עדכון מוצר" });
        await Product.findByIdAndUpdate(id, checkProduct.value);
        let updatedProduct = await Product.findById(id);
        return res.json(updatedProduct);
    }
    catch (err) {
        return res.status(400).json({ type: err.message, message: "שגיאה כללית: עדכון מוצר נכשלה" })
    }
}

const checkNumOfProduct = async (req, res) => {
    try {
        let cntProducts = (await Product.find({})).length;
        return res.json({ cntProducts });
    }
    catch (err) {
        return res.status(400).json({ type: err.message, message: "שגיאה כללית: לא מצליח לחשב מספר מוצרים  " })

    }

}

export { getAllProducts, getProductById, addProduct, deleteProductById, updateProduct, checkNumOfProduct };