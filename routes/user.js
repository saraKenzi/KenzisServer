import { addUser, login, getAllUsers } from "../controller/user.js";
import express from "express";
import { auth } from "../middlewares/auth.js";

const userRouter = express.Router();
userRouter.post('/', addUser);
userRouter.post('/login', login);
userRouter.get('/', auth, getAllUsers);

export default userRouter;