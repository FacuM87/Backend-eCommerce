import MongoCartManager from "../dao/mongo/managers/mongo.cart.manager.js";
import MongoProductManager from "../dao/mongo/managers/mongo.product.manager.js";

const cartManager = new MongoCartManager()
const productManager = new MongoProductManager()

export const cartView = async (req, res) => {
    try {
        const cartId = req.session.user.cart
        const populatedCart = await cartManager.getPopulatedCart(cartId) 

        console.log({populatedCart});
        res.render("cart",{cart: populatedCart})
    } catch (error) {
        console.log(error);
        res.send("Something went wrong while getting products from cart")
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

        const result = await productManager.getProducts(search, query, page, limit, sortValue)

        result.payload = result.docs
        result.query = query
        result.sortOrder = sortValue
        result.status = "success"
        result.user = req.session.user
        delete result.docs

        console.log(result);

        res.render("products", result)
    } catch (error) {
        console.log("Error: " + error);
        res.send(error)
    }
}

export const checkOutView = async (req, res) => {
   
    res.render("checkOut",{})
}

export const checkCartSession = async (req, res) => {

    const cartSessionActive = req.session.user
    console.log(cartSessionActive);

    if(cartSessionActive != undefined){
        const cartId = req.session.user.cart
        return res.redirect(`/cart/${cartId}`)
    } else { return res.send("No cart has been created yet, login first!") }
}