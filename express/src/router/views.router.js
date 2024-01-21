import { Router } from "express";
//import db from "../../db.json" assert { type: "json" };
import { checkRegisteredUser, auth, checkAdminPermissions, checkUserPermissions } from "../middlewares/middlewares.js"
import { cartView, productsView, checkCartSession, checkOutView } from "../controllers/views.controller.js";
import MongoProductManager from "../dao/mongo/managers/mongo.product.manager.js";


const router = Router ()


/* -- Session Views -- */

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

const productManager = new MongoProductManager()
router.get("/realtimeproducts", /* checkAdminPermissions, */ async (req, res) => {
    res.render("realTimeProducts", {
        db: await productManager.getAllProducts()
    })
})

/* -- Chat --  */

router.get("/chat", /* checkUserPermissions, */(req, res) =>{
    res.render("chat", {})
})

/* -- Cart -- */
router.get("/cart", checkCartSession)
router.get("/cart/:cid", cartView)


/* -- Products -- */

router.get("/products", productsView)
router.get("/index", (req, res) => {
    res.render("index")
})

/* -- CheckOut -- */

router.get("/checkout", checkOutView)

export default router
