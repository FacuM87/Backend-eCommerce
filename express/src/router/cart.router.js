import { Router } from "express";
//import CartManager from "../dao/fsManagers/CartsManager.js";
import { addProductToCart, changeProductQuantityInCart, createCart, deleteProductFromCart, emptyCart, insertProductsToCart, checkOutProcess } from "../controllers/carts.controller.js";

const router = Router()

//const cartManager = new CartManager()

router.post("/", createCart)

router.post("/:cid/product/:pid", addProductToCart)

router.delete("/:cid/products/:pid", deleteProductFromCart)

router.delete("/:cid", emptyCart)

router.put("/:cid/products/:pid", changeProductQuantityInCart)

router.put("/:cid", insertProductsToCart)

router.post("/:cid/purchase", checkOutProcess)

export default router