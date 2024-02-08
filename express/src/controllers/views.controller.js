import { cartService, productService } from "../services/index.repositories.js";

export const cartView = async (req, res) => {
    try {
        const cartId = req.user.user.cart

        if (!cartId) { return res.send("No cartId. Check if you are logged in, please.") }

        const populatedCart = await cartService.getPopulatedCart(cartId) 

        req.logger.info(JSON.stringify(populatedCart))
        res.render("cart",{cart: populatedCart})
    } catch (error) {
        req.logger.error("Error: " + error)
        res.status(500).send("Internal server error. Something went wrong while getting products from cart")
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
        res.render("products", result)
    } catch (error) {
        req.logger.error("Error: " + error)
        res.status(500).send("Internal server error")
    }
}

export const realTimeProducts = async (req, res) => {
    try {
        res.render("realTimeProducts", {
            db: await productService.getAllProducts()
        })     
    } catch (error) {
        req.logger.error("Error: " + error)
        res.status(500).send("Internal server error")
    }
}

export const index = (req, res) => {
    try {
        res.render("index")
    } catch (error) {
        req.logger.error("Error: " + error)
        res.status(500).send("Internal server error")
    }
}

export const chat = (req, res) =>{
    try {
        res.render("chat", {})
    } catch (error) {
        req.logger.error("Error: " + error)
        res.status(500).send("Internal server error")
    }
}

export const register = (req,res) => {
    try {
        res.render("register", {})
    } catch (error) {
        req.logger.error("Error: " + error)
        res.status(500).send("Internal server error")
    }
}

export const login = (req,res) => {
    try {
        res.render("login", {})
    } catch (error) {
        req.logger.error("Error: " + error)
        res.status(500).send("Internal server error")
    }
}

export const profile = (req, res) => {
    try {
        const user = req.user.user
        res.render("profile", user)
    } catch (error) {
        req.logger.error("Error: " + error)
        res.status(500).send("Internal server error")
    }
}

export const checkOutView = async (req, res) => {
    try {
        const cartId = req.user.user.cart
        fetch(`/api/carts/${cartId}/purchase`, { method: "post" })
        .then(response => {return response.json()})
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            req.logger.error("Error: " + error)
        });  
        res.render("checkOut",{})
        
    } catch (error) {
        req.logger.error("Error: " + error)
        res.status(500).send("Internal server error")
    }
}
