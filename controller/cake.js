import mongoose, { isValidObjectId } from "mongoose";
import { Cake, cakeValidateToAdd, cakeValidateToUpdate } from "../models/cake.js"


const getAllCakes = async (req, res) => {
    let page = req.query.page || 1;
    let perPage = req.query.perPage || 10;
    let { search } = req.query;
    try {
        let filter = {};
        if (search) {
            filter.name = new RegExp(search, 'i');
        }

        const allCakes = await Cake.find(filter)
            .skip((page - 1) * perPage)
            .limit(perPage);

        res.json(allCakes);
    } catch (err) {
        res.status(500).json({ type: 'error', message: err.message });
    }
};


const getCakeById = async (req, res) => {
    try {
        let { id } = req.params;
        if (!mongoose.isValidObjectId)
            return res.status(400).json({ type: "id error", message: "לא חוקי id" });
        let cake = await Cake.findById(id);
        if (!cake)
            return res.status(404).json({ type: "id not found!", message: "לא קיים במערכת id" });
        return res.json(cake);
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ type: "error", message: err.message });
    }
}

const addCakes = async (req, res) => {
    try {
        let validateResult = cakeValidateToAdd(req.body);
        if (validateResult.error)
            return res.status(404).json({ type: "חסר פרמטרים", message: validateResult.error.details[0].message });
        let { cakeName, price } = req.body;
        let sameCake = await Cake.findOne({ cakeName, price });
        if (sameCake)
            return res.status(409).json({ type: "כפילות נתונים", message: "קיים מוצר בשם ובמחיר זה!!" });
        let newCake = await Cake.create(validateResult.value);
        res.json(newCake);
    }
    catch (err) {
        res.status(400).json({ type: "הוספת מוצר נכשלה", message: err.message })
    }
}

const deleteCakeById = async (req, res) => {
    try {
        let { id } = req.params;
        if (!mongoose.isValidObjectId(id))
            res.status(400).json({ type: "שגיאת מזהה מוצר", message: "קוד מוצר לא תקין!" });
        const findCake = await Cake.findById(id);
        if (!findCake)
            res.status(404).json({ type: "not found! ", message: " לא נמצא מוצר עם הקוד שנשלח " });
        if (!req.user.role == "admin")
            return res.status(403).json({ type: "שגיאת הרשאה", message: "אינך מנהל- אין באפשרותך למחוק מוצרים מהמערכת!" });
        const deleted = await Cake.findByIdAndDelete(id);
        res.json(deleted);
    }
    catch (err) {
        res.status(400).json({ type: "מחיקת מוצר נכשלה", message: err.message })
    }
}
const updateCake = async (req, res) => {
    try {
        let { id } = req.params;
        if (!isValidObjectId(id))
            return res.status(400).json({ type: "invalid id", message: "Id wrong!" });

        let searchCake = Cake.findById({ id });
        if (!searchCake)
            return res.status(404).json({ type: "NOT FOUND", message: "Can't found cake by this id!" });

        let cake = req.body;
        let checkCake = cakeValidateToUpdate(cake);
        if (checkCake.error)
            return res.status(400).json({ type: "err from 'cakeValidateToUpdate'", message: checkCake.error.details[0].message });
        await Cake.findByIdAndUpdate(id, checkCake.value);
        let updatedCake = await Cake.findById(id);
        res.json(updatedCake);
    }
    catch (err) {
        res.status(400).json({ type: "עדכון מוצר נכשל", message: err.message })
    }


}

export { addCakes, getAllCakes, getCakeById, deleteCakeById, updateCake };