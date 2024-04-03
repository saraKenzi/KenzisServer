export const errHandle = (err, req, res, next) => {
    let statusCode = res.statusCode || 500;
    let message = err.message || "מצטערים! התרחשה שגיאה בשרת";
    return res.status(statusCode).send(message);
}