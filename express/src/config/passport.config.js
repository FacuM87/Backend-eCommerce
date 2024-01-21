import passport from "passport"
import local from "passport-local"
import GitHubStrategy from "passport-github2"
import UserModel from "../dao/mongo/models/user.model.js"
import { createHash, validatePassword } from "../utils.js"
import config from "./config.js"
import MongoCartManager from "../dao/mongo/managers/mongo.cart.manager.js"
import MongoUserManager from "../dao/mongo/managers/mongo.user.manager.js"

const cartManager = new MongoCartManager()
const userManager = new MongoUserManager()

const gitclientID=config.githubClientId
const gitclientSecret=config.githubClientSecret
const gitcallbackURL=config.githubClientCallback
const amdinUserName=/* config.amdinUserName || */ "adminCoder@coder.com"
const adminPassword=/* config.adminPassword || */ "adminCod3r123"

const LocalStrategy = local.Strategy

const initializePassport = () => {
    
    passport.use("login", new LocalStrategy ({
        usernameField: "email"
    }, async (username, password, done) => {

        if (username === "adminCoder@coder.com" && password === "adminCod3r123") {
            const user = {
                _id:"admin",
                first_name:"admin",
                last_name:"admin",
                email:username,
                age:"",
                password:"adminCod3r123",
                role:"admin",
                cart:""
            };
            return done(null, user)
        }

        try {
            const user = await userManager.getUserByEmail(username)
            if (!user) {
                console.log("No users registered with that email address");
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

    passport.use("github", new GitHubStrategy({
        clientID: gitclientID,
        clientSecret: gitclientSecret,
        callbackURL: gitcallbackURL,
        scope: ["user:email"]
    }, async (accessToken, refreshToken, profile, done) =>{
        console.log(profile);
        try {
            const user = await userManager.getUserByEmail(profile._json.email)  
            console.log(user);
            if(user){
                console.log("User is logged in")
                return done(null, user);
            }

            const newUser = {
                first_name: profile._json.name,
                last_name:"",
                email: profile._json.email,
                password: ""
            }

            const result = await userManager.createUser(newUser)

            return done(null, result)
        } catch (error) {
            return done("Couldnt login with github: "+error)
        }
    }))

    passport.use("register", new LocalStrategy({
        passReqToCallback: true,
        usernameField: "email"
    }, async (req, username, password, done) =>{
        const { first_name, last_name, email, age } = req.body
        try {
            const user = await userManager.getUserByEmail(username) 
            if(user) {
                console.log("User is already registered");
                return done(null, false)
            }
            
            const newCart = await cartManager.createNewCart()
            console.log(newCart)
            const newUser = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password),
                cart: newCart._id
            }
    
            const result = await userManager.createUser(newUser)
            return done(null, result)
        } catch (error) {
            done("Error: " + error)
        }        
    }) )


    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async(id, done) =>{

        if (id === "admin") {
			return done(null, false);
		}

        const user = await userManager.getUserById(id)
        done(null, user)
    })
}

export default initializePassport