import express from "express";
import { config } from "dotenv";
import cors from "cors";

import { connectToDB } from "./config/configDB.js"
import { errHandle } from "./middlewares/errHandle.js";
import productRouter from "./routes/product.js";
import userRouter from "./routes/user.js";
import orderRouter from "./routes/order.js";
// import mailRouter from "./routes/mail.js";

config();
const app = express();

connectToDB();
app.use(express.json());
app.use(cors());
app.use(express.static("files"));
app.use("/api/products", productRouter);
app.use("/api/users",userRouter);
app.use("/api/orders",orderRouter);
// app.use("/api/mail",עןmailRouter);
app.use(errHandle);

let port = process.env.PORT || 3500;
app.listen(port, () => {
    console.log(`app is listening in on port ${port}`)
})