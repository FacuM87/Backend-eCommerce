import { Router } from "express";
//import db from "../../db.json" assert { type: "json" };
import ProductsModel from "../dao/mongo/models/products.model.js"


const router = Router ()

router.get("/", (req,res) => {
    res.render("index", {})
})

router.get("/home", async (req, res) => {
    res.render("home", {
        db: /*db*/await ProductsModel.find().lean().exec()
    })
})

router.get("/realtimeproducts", async (req, res) => {
    res.render("realTimeProducts", {
        db: /*db*/await ProductsModel.find().lean().exec()
    })
})

router.get("/chat", (req, res) =>{
    res.render("chat", {})
})


export default router
