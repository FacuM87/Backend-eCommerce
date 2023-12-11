import passport from "passport"
import local from "passport-local"
import UserModel from "./dao/mongo/models/user.model.js"
import { createHash, validatePassword } from "./utils.js"

const LocalStrategy = local.Strategy

const initializePassport = () => {
    
    passport.use("login", new LocalStrategy ({
        usernameField: "email"
    }, async (username, password, done) => {

        if (username === "adminCoder@coder.com" && password === "adminCod3r123") {
            const user = {
                name: "admin",
                last_name: "admin",
                email: username,
                password: "adminCod3r123",
                role: "admin",
                _id:"admin"
            };
            /* req.session.user = adminUser; */
            return done(null, user)
            /* res.redirect("/products") */;
        }

        try {
            const user = await UserModel.findOne({ email: username }) /*.lean().exec()*/
            if (!user) {
                console.log("No users registered with that email");
                return done(null, false)
            }

            if(!validatePassword(password, user)){
                console.log("Invalid Credentials");
                return done(null, false)
            }

            done(null, user)
            
        } catch (error) {
            done("Error: " + error)
        }
    }))

    passport.use("register", new LocalStrategy({
        passReqToCallback: true,
        usernameField: "email"
    }, async (req, username, password, done) =>{
        const { name, email } = req.body

        try {
            const user = await UserModel.findOne({ email: username })
            if(user) {
                console.log("User is already registered");
                return done(null, false)
            }
            
            const newUser = {
                name,
                email,
                password: createHash(password)
            }
    
            const result = await UserModel.create(newUser)
            return done(null, result)
        } catch (error) {
            done("Error: " + error)
        }

        
    }) )


    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async(id, done) =>{
        const user = await UserModel.findById(id)
        done(null, user)
    })
}

export default initializePassport