import express from "express";
import { loginController, registerController, testController } from "../controllers/authController.js"
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// routing
//Register Route || POST
router.post('/register', registerController);

//LOGIN Route || POST
router.post('/login', loginController)

//route for category





//test route
router.get('/test' ,requireSignIn,isAdmin ,  testController)


export default router