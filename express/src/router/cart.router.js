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

router.delete("/:cid/products/:pid", async (req,res) =>{
    try {
        const cartId = req.params.cid
        const productId = req.params.pid

        const cart = await CartsModel.findById(cartId)
        
        const newCart = cart.products.filter(product => product.product != productId);

        const deletingDocument = await CartsModel.updateOne(
        {_id: cartId}, 
        { $set: { products: newCart } })
        
        res.send(deletingDocument)         
        
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

router.delete("/:cid", async (req,res) =>{
    try {
        const cartId = req.params.cid
        const cart = await CartsModel.findById(cartId)
        const emptyCart = cart.products = []

        const emptyingCart = await CartsModel.updateOne(
            {_id: cartId}, 
            { $set: { products: emptyCart } }
        )

        console.log(emptyingCart)
        res.send(emptyingCart)

    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

router.put("/:cid/products/:pid", async (req,res) =>{
    try {
        const quantityToAdd = parseInt(req.body.quantity)
        const cartId = req.params.cid
        const productId = req.params.pid
    
        const cart = await CartsModel.findById(cartId)

        const productToUpdate = cart.products.find(p => p.product == productId)

        productToUpdate.quantity += quantityToAdd
        console.log(productToUpdate);

        console.log(cart);

        const updatingCart = await CartsModel.updateOne(
            {_id: cartId}, 
            { $set: {products: cart.products } }
        )
        console.log(updatingCart);
        res.send(updatingCart)

    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

/* 

Para verificar la ruta siguiente dejo un id a un carrito vacío y un array de productos para postman

cid: 6563bb7e38fe3f2035a87c54

[
    {
        "quantity":2,
        "product": "6562b12c1552b1e892e6f33b"
    },
    {
        "quantity":6,
        "product":"6562b12c1552b1e892e6f343"
    }
]

*/
router.put("/:cid", async (req,res) =>{
    try {
        const cartId = req.params.cid
        const newProducts = req.body

        const updateCart = await CartsModel.updateOne(
            {_id: cartId}, 
            { $set: {products: newProducts } }
        )
        console.log(updateCart);
        res.send(updateCart)

    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

export default router