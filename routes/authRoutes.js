import {Router} from "express";
import {
    activateController,
    loginController,
    logoutController, refreshController,
    registrationController
} from "../controllers/AuthController.js";

const router = new Router()

router.get('/refresh', refreshController)
router.get('/activate/:link', activateController)

router.post('/registration', registrationController)
router.post('/login', loginController)
router.post('/logout', logoutController)

export default router