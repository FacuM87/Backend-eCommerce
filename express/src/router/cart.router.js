import { Router } from "express";
//import CartManager from "../dao/fsManagers/CartsManager.js";
import CartsModel from "../dao/mongo/models/carts.model.js"
import ProductsModel from "../dao/mongo/models/products.model.js";

const router = Router()

//const cartManager = new CartManager()

router.post("/", async (req,res) => {
    try {
        //const message = await cartManager.createNewCart()
        const cartCreated = await CartsModel.create({products:[]})
        console.log(JSON.stringify(cartCreated));
        const carts = await CartsModel.find().lean().exec()
        console.log(JSON.stringify(carts));
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
        const product = await ProductsModel.findById(productId)

        if (!product) {
            console.log("Wrong Product ID");
            return
        }

        if (!cart) {
            console.log("Wrong Cart ID");
            return   
        }

        const productIndex = cart.products.findIndex(p => p.product.equals(productId))
        console.log(productIndex);
        if (productIndex !== -1) {
            cart.products[productIndex].quantity += 1
        } else {
            const newProduct = {
                product: productId,
                quantity: 1
            }
            cart.products.push(newProduct)
        }
        const result = await cart.save() 
        console.log(result);
        res.send(result)
         
    } catch (error) {
        console.log(error);
        res.send("Something went wrong while adding products to cart")
    }
})

export default router