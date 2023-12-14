import { Router } from "express"
import passport from "passport"

const router = Router() 

router.post("/login", passport.authenticate("login", {failureRedirect:"/"}) , async(req, res) => {
    if (!req.user) return res.status(401).send("Invalid Credentials")

    req.session.user = req.user
    console.log(req.user);

    return res.redirect("/products")
})

router.get("/github", passport.authenticate("github", {scope: ["user: email"]}), (req,res) => {})


router.get("/githubcallback", passport.authenticate("github", {failureRedirect:"/login"}), (req,res) => {
    
    req.session.user = req.user
    res.redirect("/products")
})

router.post("/register", passport.authenticate("register", {failureRedirect:"/register"}),async(req, res) => {
    
    return res.redirect("/")
})

router.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if(err) return res.send("Logout error")

        return res.redirect("/")
    }) 
})

export default router
