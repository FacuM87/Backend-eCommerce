import { Router } from "express";
//import CartManager from "../dao/fsManagers/CartsManager.js";
import CartsModel from "../dao/mongo/models/carts.model.js"

const router = Router()

//const cartManager = new CartManager()

router.post("/", async (req,res) => {
    try {
        //const message = await cartManager.createNewCart()
        const cartCreated = await CartsModel.create({products:[]})
        console.log(cartCreated);
        const carts = await CartsModel.find().lean().exec()
        console.log(carts);
        res.send("New cart has been created")
        
    } catch (error) {
        console.log(error);
        res.send("Something went wrong while creating new cart")
    }
})

router.get("/:cid", async (req, res) => {
    try {
        const cartId = req.params.cid
        //const productsInCart = await cartManager.productsInCart(cartId)
        const productsInCart = await CartsModel.findById(cartId)
        res.send(productsInCart)
    } catch (error) {
        console.log(error);
        res.send("Something went wrong while getting products from cart")
    }
})

router.post("/:cid/product/:pid", async (req,res) => {
    try {
        const cartId = req.params.cid
        const productId = req.params.pid
        //res.send(await cartManager.addProductToCart(productId,cartId))
        const cart = await CartsModel.findById(cartId)
        cart.products.push({product: productId})
        const result = await CartsModel.updateOne({_id: cartId}, cart)
        console.log({result});
        res.send("Product has been added to cart")
    } catch (error) {
        console.log(error);
        res.send("Something went wrong while adding products to cart")
    }
})

export default router