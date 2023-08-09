import express from "express";
import {
    forgotPasswordController,
    loginController,
    registerController,
    testController
}
    from "../controllers/authController.js"
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// routing
//Register Route || POST
router.post('/register', registerController);

//LOGIN Route || POST
router.post('/login', loginController)

//Forgot  password || Postx
router.post('/forgot-password', forgotPasswordController);


//route for category


//test route
router.get('/test', requireSignIn, isAdmin, testController)

//Protected Route user || GET

router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
})
//Protected Route Admin || GET

router.get("/admin-auth", requireSignIn,isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
})


export default router