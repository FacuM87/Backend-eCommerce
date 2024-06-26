import { cartService, productService } from "../repositories/index.repositories.js";
import { verifyToken } from "../utils.js";

export const cartView = async (req, res) => {
    try {
        const cartId = req.user.user.cart

        if (!cartId) { return res.send("No cartId. Check if you are logged in, please.") }

        const populatedCart = await cartService.getPopulatedCart(cartId) 

        req.logger.info(JSON.stringify(populatedCart))
        return res.render("cart",{
            cart: populatedCart,
            user: req.user.user
        })
    } catch (error) {
        req.logger.error("Error: " + error)
        return res.status(500).send("Internal server error. Something went wrong while getting products from cart")
    }
}

export const productsView = async (req, res)=> {
    try {
        /* const products = await juan.getProducts() */
        const limit = parseInt(req.query.limit) || 10
        const page = parseInt(req.query.page) || 1
        const query = req.query.query || ""
        const sort = req.query.sort
        const sortValue= sort === "Desc" ? { price: -1 } : (sort === "Asc" ? { price: 1 } : {})

        const search = {}
       // if (query) {search.title= { "$regex": query, "$options": "i" }}

        if (query) {
            search.$or = [
                { title: { "$regex": query, "$options": "i" } },
                { category: { "$regex": query, "$options": "i" } }
            ];
        }

        const result = await productService.getProducts(search, query, page, limit, sortValue)

        result.payload = result.docs
        result.query = query
        result.sortOrder = sortValue
        result.status = "success"
        result.user = req.user.user
        delete result.docs

        console.log(result);  
        req.logger.info(JSON.stringify(result))
        return res.render("products", result)
    } catch (error) {
        req.logger.error("Error: " + error)
        return res.status(500).send("Internal server error")
    }
}

export const realTimeProducts = async (req, res) => {
    try {
        return res.render("realTimeProducts", {
            db: await productService.getAllProducts(),
            user: req.user.user
        })     
    } catch (error) {
        req.logger.error("Error: " + error)
        return res.status(500).send("Internal server error")
    }
}

export const chat = (req, res) =>{
    try { 
        return res.render("chat", {user: req.user.user})
    } catch (error) {
        req.logger.error("Error: " + error)
        return res.status(500).send("Internal server error")
    }
}

export const register = (req,res) => {
    try {
        return res.render("register", {})
    } catch (error) {
        req.logger.error("Error: " + error)
        return res.status(500).send("Internal server error")
    }
}

export const login = (req,res) => {
    try {
        return res.render("login", {})
    } catch (error) {
        req.logger.error("Error: " + error)
        return res.status(500).send("Internal server error")
    }
}

export const profile = (req, res) => {
    try {
        const user = req.user.user
        return res.render("profile", {user})
    } catch (error) {
        req.logger.error("Error: " + error)
        return res.status(500).send("Internal server error")
    }
}

export const restablishPassword = async (req, res) => {
    try {
        return res.render("restablishPassword",{})
    } catch (error) {
        req.logger.error("Error: " + error)
        return res.status(500).send("Internal server error")
    }
}

export const resetPasswordForm = (req, res) =>{
    try {
        const token = req.params.token
        console.log(token);

        const validToken = verifyToken(token)
        console.log(validToken);

        validToken? res.render("resetPassword",{validToken, token}) : (
            res.render("resetPassword", {validToken, expired:true})) 
    } catch (error) {
        req.logger.error("Error: " + error)
        return res.status(500).send("Internal server error")
    }
}

export const usersCrud = async (req, res) =>{
    try {
        const user = req.user.user
        
        return res.render("usersCrud",{user})
    } catch (error) {
        
    }
}
