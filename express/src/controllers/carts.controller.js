import CartsModel from "../dao/mongo/models/carts.model.js"
import ProductsModel from "../dao/mongo/models/products.model.js";
import { createNewCart, getCartByID } from "../dao/mongo/managers/mongo.cart.manager.js";

export const addProductToCart = async (req,res) => {
    try {
        const cartId = req.session.user.cart
        const productId = req.params.pid
        //res.send(await cartManager.addProductToCart(productId,cartId))
        const cart = await getCartByID(cartId) /* await CartsModel.findById(cartId) */ 
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

        const cart = await getCartByID(cartId)/* await CartsModel.findById(cartId) */
        console.log("Carrito"+cart);
        
        const newProducts = cart.products.filter(product => product.product != productId);
        console.log("Nuevo array de productos"+newProducts);

        const deletingDocument = await CartsModel.updateOne(
        {_id: cartId}, 
        { $set: { products: newProducts } })
        
        res.send(deletingDocument)         
        
    } catch (error) {
        console.log(error);
        res.send(error)
    }
}

export const emptyCart = async (req,res) =>{
    try {
        const cartId = req.params.cid
        const cart = await getCartByID (cartId) /*await CartsModel.findById(cartId)*/
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
}

export const createCart = async (req,res) => {
    try {
        //const message = await cartManager.createNewCart()
        const cartCreated = await createNewCart() /*await CartsModel.create({products:[]})*/
        console.log(JSON.stringify(cartCreated));
        const carts = await CartsModel.find().lean().exec()
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
    
        const cart = await getCartByID(cartId)

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
}

export const insertProductsToCart = async (req,res) =>{
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
}