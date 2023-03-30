import { Router } from "express";
import * as Controller from '../controllers/auth.js'

const router=new Router();

router.post('/login',Controller.login)

export default router