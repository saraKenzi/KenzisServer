import express from "express";
import { config } from "dotenv";
import cors from "cors";

import { connectToDB } from "./config/configDB.js"
import { errHandle } from "./middlewares/errHandle.js";
import cakeRouter from "./routes/cake.js";
import userRouter from "./routes/user.js";
import orderRouter from "./routes/order.js";

config();
const app = express();

connectToDB();
app.use(express.json());
app.use(cors());

app.use("/api/cake", cakeRouter);
app.use("/api/user",userRouter);
app.use("/api/order",orderRouter)
app.use(errHandle);

let port = process.env.PORT || 3500;
app.listen(port, () => {
    console.log(`app is listening in on port ${port}`)
})