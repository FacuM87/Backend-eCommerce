import { Router } from "express" 
// import ProductManager from "../dao/fsManagers/ProductManager.js"
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/products.controller.js"
import { checkAdminPermissions } from "../middlewares/middlewares.js"


const router = Router()

/* const juan = new ProductManager("./db.json") */

router.get("/", getProducts)

router.get("/:pid", getProductById)

router.post("/", checkAdminPermissions, createProduct)

router.put("/:pid", checkAdminPermissions, updateProduct)

router.delete("/:pid", checkAdminPermissions, deleteProduct)

export default router
