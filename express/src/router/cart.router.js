import { Router } from "express";
//import CartManager from "../dao/fsManagers/CartsManager.js";
import CartsModel from "../dao/mongo/models/carts.model.js"
import ProductsModel from "../dao/mongo/models/products.model.js";
import { addProductToCart, changeProductQuantityInCart, createCart, deleteProductFromCart, emptyCart, insertProductsToCart } from "../controllers/carts.controller.js";

const router = Router()

//const cartManager = new CartManager()

router.post("/", createCart)

router.post("/:cid/product/:pid", addProductToCart)

router.delete("/:cid/products/:pid", deleteProductFromCart)

router.delete("/:cid", emptyCart)

router.put("/:cid/products/:pid", changeProductQuantityInCart)

router.put("/:cid", insertProductsToCart)

export default router