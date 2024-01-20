import MongoCartManager from "../dao/mongo/managers/mongo.cart.manager.js";
import MongoProductManager from "../dao/mongo/managers/mongo.product.manager.js";

const cartManager = new MongoCartManager()
const productManager = new MongoProductManager()

export const addProductToCart = async (req,res) => {
    try {
        const cartId = req.session.user.cart
        const productId = req.params.pid

        const cart = await cartManager.getCartByID(cartId) 
        const product = await productManager.getProductById(productId)

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
        res.send(cart)
         
    } catch (error) {
        console.log(error);
        res.send("Something went wrong while adding products to cart")
    }
}

export const deleteProductFromCart = async (req,res) =>{
    try {
        const cartId = req.params.cid.toString()
        console.log(cartId);
        const productId = req.params.pid.toString()
        console.log(productId);

        const cart = await cartManager.getCartByID(cartId)
        console.log("Cart: "+cart);
        
        const newProducts = cart.products.filter(product => product.product != productId);
        console.log("New products array: "+newProducts);

        const deletingDocument = await cartManager.updateCart(cartId, newProducts)
        
        res.send(deletingDocument)         
        
    } catch (error) {
        console.log(error);
        res.send(error)
    }
}

export const emptyCart = async (req,res) =>{
    try {
        const cartId = req.params.cid
        const cart = await cartManager.getCartByID (cartId) 
        
        const emptyCart = cart.products = []
        const emptyingCart = await cartManager.updateCart(cartId, emptyCart) 

        console.log(emptyingCart)
        res.send(emptyingCart)

    } catch (error) {
        console.log(error);
        res.send(error)
    }
}

export const createCart = async (req,res) => {
    try {
        const cartCreated = await cartManager.createNewCart() 
        console.log(JSON.stringify(cartCreated))

        const carts = await cartManager.getCarts()
        console.log(JSON.stringify(carts));
        res.send("New cart has been created")
        
    } catch (error) {
        console.log(error);
        res.send("Something went wrong while creating new cart")
    }
}

export const changeProductQuantityInCart = async (req,res) =>{
    try {
        const quantityToAdd = parseInt(req.body.quantity)
        const cartId = req.params.cid
        const productId = req.params.pid
    
        const cart = await cartManager.getCartByID(cartId)

        const productToUpdate = cart.products.find(p => p.product == productId)

        productToUpdate.quantity += quantityToAdd
        console.log(productToUpdate);
        
        console.log(cart);

        const newQuantity = cart.products

        const updatingCart = await cartManager.updateCart(cartId, newQuantity)
        console.log(updatingCart);
        res.send(updatingCart)

    } catch (error) {
        console.log(error);
        res.send(error)
    }
}

export const insertProductsToCart = async (req,res) =>{
    try {
        const cartId = req.params.cid
        const newProducts = req.body

        const updatedCart = await cartManager.updateCart(cartId, newProducts)

        console.log(updatedCart);
        res.send(updatedCart)

    } catch (error) {
        console.log(error);
        res.send(error)
    }
}

export const checkOutProcess = async (req, res) =>{
    res.send("just a checkout testing message")
}