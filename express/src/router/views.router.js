import { Router } from "express";
//import db from "../../db.json" assert { type: "json" };
import ProductsModel from "../dao/mongo/models/products.model.js"
import CartsModel from "../dao/mongo/models/carts.model.js";


const router = Router ()

router.get("/", (req,res) => {
    res.render("login", {})
})

router.get("/realtimeproducts", async (req, res) => {
    res.render("realTimeProducts", {
        db: /*db*/await ProductsModel.find().lean().exec()
    })
})

router.get("/chat", (req, res) =>{
    res.render("chat", {})
})

router.get("/cart/:cid", async (req, res) => {
    try {
        const cartId = req.params.cid
        const populatedCart = await CartsModel.findById(cartId).populate("products.product").lean().exec();

        console.log({populatedCart});
        res.render("cart",{cart: populatedCart})
    } catch (error) {
        console.log(error);
        res.send("Something went wrong while getting products from cart")
    }
})

router.get("/products", async (req, res)=> {
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

        const result = await ProductsModel.paginate(search
        , {
            page: query? 1: page,
            limit,
            sort: sortValue,
            lean: true
        })

        result.payload = result.docs
        result.query = query
        result.sortOrder = sortValue
        result.status = "succes"
        delete result.docs

        console.log(result);

        res.render("products", result)
    } catch (error) {
        console.log("Error: " + error);
        res.send(error)
    }
})


export default router
