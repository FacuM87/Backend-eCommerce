import { Router } from "express";
import db from "../../db.json" assert { type: "json" };


const router = Router ()

router.get("/", (req,res) => {
    res.render("index", {})
})

router.get("/home", (req, res) => {
    res.render("home", {
        db: db
    })
})

router.get("/realtimeproducts", (req, res) => {
    res.render("realTimeProducts", {
        db: db
    })
})



export default router
