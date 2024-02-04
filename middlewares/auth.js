import jwt from "jsonwebtoken";

export const auth = async (req, res,next) => {
    let token = req.headers["user-token"];
    if (!token)
        return res.status(403).json({ type: "הראשת גישה", message: "אין לך הרשאה לבצע פעולה זו" });
    try {
        const decoded = jwt.verify(token, process.env.JWT_STR);
        console.log(decoded);
        req.userToken = decoded;
        next();
    }
    catch (err) {
        res.status(400).json({ type: "אין הרשאה", message: err.message });
    }
}

export const authAdmin = async (req, res,next) => {
    let token = req.headers["user-token"];
    if (!token)
        return res.status(403).json({ type: "הראשת גישה", message: "אין לך הרשאה לבצע פעולה זו" });
    try {
        const decoded = jwt.verify(token, process.env.JWT_STR);
        console.log(decoded);
        req.userToken = decoded;
        if (decoded.role != "admin")
            return res.status(403).json({ type: "הראשת גישה", message: "אינך מורשה,אנא פנה למנהל המערכת" });

        next();

    }
    catch (err) {
        res.status(400).json({ type: "error from authAdmin middleWare", message: err.message });
    }
}