import { Router } from "express" 
// import ProductManager from "../dao/fsManagers/ProductManager.js"
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/products.controller.js"


const router = Router()

/* const juan = new ProductManager("./db.json") */

router.get("/", getProducts)

router.get("/:pid", getProductById)

router.post("/", createProduct)

router.put("/:pid", updateProduct)

router.delete("/:pid", deleteProduct)

export default router
