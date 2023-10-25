import { Router } from "express";
import CartManager from "../Cart.js";

const router = Router()

const cartManager = new CartManager()

router.post("/", async (req,res) => {
    try {
        const message = await cartManager.createNewCart()
        console.log(message);
        res.send(message)
        
    } catch (error) {
        console.log(error);
        res.send("Something went wrong while creating new cart")
    }
})

router.get("/:cid", async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid)
        const productsInCart = await cartManager.productsInCart(cartId)
        res.send(productsInCart)
    } catch (error) {
        console.log(error);
        res.send("Something went wrong while getting products from cart")
    }
})

router.post("/:cid/product/:pid", async (req,res) => {
    try {
        const cartId = parseInt(req.params.cid)
        const productId = parseInt(req.params.pid)
        res.send(await cartManager.addProductToCart(productId,cartId))
    } catch (error) {
        console.log(error);
        res.send("Something went wrong while adding products to cart")
    }
})

export default router