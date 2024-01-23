import MongoCartManager from "../dao/mongo/managers/mongo.cart.manager.js";
import MongoProductManager from "../dao/mongo/managers/mongo.product.manager.js";
import MongoTicketManager from "../dao/mongo/managers/mongo.ticket.manager.js";
import { cartService } from "../services/index.repositories.js";

const cartManager = new MongoCartManager()
const productManager = new MongoProductManager()
const ticketManager = new MongoTicketManager()

export const checkOutProcess = async (req, res) =>{
    try {
        const userEmail = req.session.user.email
        const cartId = req.session.user.cart
        const cart = await cartManager.getPopulatedCart(cartId)
        
        let totalAmount = 0
        let productsToBuy = []
        let otherProducts = []
        const checkStock = async () =>{
            for (const product of cart.products) {
                const productQuantity = product.quantity
                const productId = product.product

                const productInDB = await productManager.getProductById(productId)

                const productStock = productInDB.stock
                const productPrice = productInDB.price
                
                if (productQuantity<=productStock) {
                    const newProductStock = productStock-productQuantity
                    const changes = { stock: newProductStock }
                    const updatedProduct = await productManager.updateProduct(productId, changes)
                    console.log(updatedProduct);

                    totalAmount+=productQuantity*productPrice
                    productsToBuy.push(product)
                } else { otherProducts.push(product) }
            }
        }
        await checkStock()
        
        let ticket
        if (totalAmount>0) {
            ticket = await ticketManager.createTicket(totalAmount,userEmail)        
        } else { ticket = "No operation, no ticket"}
        
        const cartUpdated = await cartManager.updateCart(cartId, otherProducts)
        console.log(cartUpdated);

        const result = [productsToBuy, otherProducts, ticket]
        console.log(result);
        res.send(result)
    } catch (error) {
        console.log(error);    
    }
}

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
        const cartCreated = await cartService.createNewCart() 
        console.log(JSON.stringify(cartCreated))

        const carts = await cartManager.getCarts()
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
