import { Router } from "express";
//import db from "../../db.json" assert { type: "json" };
import ProductsModel from "../dao/mongo/models/products.model.js";
import CartsModel from "../dao/mongo/models/carts.model.js";
import { cartView, productsView } from "../controllers/views.controller.js";


const router = Router ()


/* -- Session Views -- */

const checkRegisteredUser = (req, res, next) => {
    if(req.session?.user) return res.redirect("/profile")
    return next()
}

const auth = (req, res, next) => {
    if(req.session?.user) return next()
    res.redirect('/')
}

router.get("/", checkRegisteredUser, (req,res) => {
    res.render("login", {})
})

router.get("/register", checkRegisteredUser, (req,res) => {
    res.render("register", {})
})

router.get("/profile", auth, (req, res) => {
    const user = req.session.user
    console.log(user);
    res.render("profile", user)
})


/* -- Admin CRUD -- */

router.get("/realtimeproducts", async (req, res) => {
    res.render("realTimeProducts", {
        db: /*db*/await ProductsModel.find().lean().exec()
    })
})

/* -- Chat --  */

router.get("/chat", (req, res) =>{
    res.render("chat", {})
})

/* -- Cart -- */

router.get("/cart/:cid", cartView)


/* -- Products -- */

router.get("/products", productsView)

router.get("/index", (req, res) => {
    res.render("index")
})


export default router
