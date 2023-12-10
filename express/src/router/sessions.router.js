import { Router } from "express"
import UserModel from "../dao/mongo/models/user.model.js"
import { createHash, validatePassword } from "../utils.js"

const router = Router() 

router.post("/login", async(req, res) => {
    const { email, password } = req.body
    console.log(req.body);

    if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
        const adminUser = {
            name: "admin",
            last_name: "admin",
            email: "adminCoder@coder.com",
            password: "adminCod3r123",
            role: "admin"
        };
        req.session.user = adminUser;
        return res.redirect("/products");
    }

    const user = await UserModel.findOne({ email })

    if(!user) return res.status(401).send("User Not Found")
    if(!validatePassword(password, user)) return res.status(403).send("Invalid Credentials")

    req.session.user = user
    console.log(user);

    return res.redirect("/products")
})

router.post("/register", async(req, res) => {
    const user = req.body
    console.log(user);
    user.password = createHash(user.password)
    await UserModel.create(user)

    return res.redirect("/")
})

router.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if(err) return res.send("Logout error")

        return res.redirect("/")
    })
})

export default router
