import { Router } from "express";
import db from "../../db.json" assert { type: "json" };


const router = Router ()

router.get("/home", (req, res) => {
    res.render("home", {
        db: db
    })
})



export default router
