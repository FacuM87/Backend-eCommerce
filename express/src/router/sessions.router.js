import { Router } from "express"
import passport from "passport"
import { login } from "../controllers/sessions.controller.js"
import UserDTO from "../DTO/user.dto.js"

const router = Router() 

router.post("/login", passport.authenticate("login", {failureRedirect:"/"}) , login)

router.get("/github", passport.authenticate("github", { scope: ["user:email"] } ), (req,res) => {})


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

router.get("/current", (req, res) =>{
    try {
		const user = req.session.user;
        const userDTO = new UserDTO(user)
		return res.send(userDTO);
	} catch (error) {
		res.status(500).send("Error Message: "+error);
	}
})

export default router
