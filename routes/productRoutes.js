import express  from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createProductController, deleteProductController, getProductController, getSingleProductController, productPhotoController, updateProductController } from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
//Create Products || POST
router.post("/create-product" ,requireSignIn , isAdmin  ,formidable(),  createProductController)
// 1/product/create-product
//Update Product || POST
router.put("/update-product/:pid" ,requireSignIn , isAdmin  ,formidable(),  updateProductController)

//Get All Products || GET
router.get("/get-product" , getProductController);

//Get Single Product || GET
router.get("/get-product/:slug" , getSingleProductController);

//Get Photo || GET
router.get("/product-photo/:pid" , productPhotoController)

// Delete Product || delete
router.delete("/product/:pid" ,requireSignIn ,isAdmin,  deleteProductController)


export default router;