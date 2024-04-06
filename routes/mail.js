import express from "express";
import { checkMail,passwordRecovery } from '../controller/mail.js';

const mailRouter = express.Router();
mailRouter.post('/',checkMail );
mailRouter.put('/',passwordRecovery)

export default mailRouter;
