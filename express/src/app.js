import express from "express"
import handlebars from "express-handlebars"
import session from "express-session"
import MongoStore from "connect-mongo"
import __dirname from "./utils.js"
/* import { Server } from "socket.io" */
import viewsRouter from "./router/views.router.js"
import cartRouter from "./router/cart.router.js"
import productsRouter from "./router/products.router.js"
import sessionRouter from "./router/sessions.router.js"
import loggerRouter from "./router/logger.router.js"
import usersRouter from "./router/users.router.js"
import paymentsRouter from "./router/payments.router.js"
//import ProductManager from "./dao/fsManagers/ProductManager.js"
import mongoose from "mongoose"
import passport from "passport"
import initializePassport from "./config/passport.config.js"
import config from "./config/config.js"
import dotenv from "dotenv"
import cors from 'cors'
import cookieParser from "cookie-parser"
/* import { chatService, productService } from "./repositories/index.repositories.js" */
import { addLogger } from "./middlewares/logger.js"
import SwaggerUIexpress from "swagger-ui-express"
import swaggerJSDoc from "swagger-jsdoc"
import { socketServer } from "./websocket.js"



/* -- Express -- */
const app = express()
app.use(addLogger)
app.use(cookieParser())
dotenv.config()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

/* -- CORS -- */
app.use(cors())


/* -- Mongo DB -- */
const mongoURL = config.mongoUrl
const mongoDB = config.mongoDB 

mongoose.connect(mongoURL, {dbName: mongoDB})
    .then(() => {
        console.log("Mongo DB connected")
    })
    .catch(e => {
        console.log("Couldnt connect with Mongo DB, error message: "+e);
        res.status(500).send(e)
    })   


/* -- Swagger -- */
const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "eCommerce Backend Documentation",
            description: "Here you can find the backend documentation for eCommerce backend project"
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
  }
const specs = swaggerJSDoc(swaggerOptions)
app.use("/apidocs", SwaggerUIexpress.serve, SwaggerUIexpress.setup(specs))


/* -- Sessions -- */
const sessionSecret=config.sessionSecret
app.use(session({
    store: MongoStore.create({
        mongoUrl: mongoURL,
        dbName: mongoDB,
        ttl: 300
    }),    
    secret: sessionSecret,
    resave: true,
    saveUninitialized: true
}))  


/* -- HandleBars -- */
app.engine('handlebars', handlebars.engine())
app.use("/static", express.static(__dirname + "/public"))
app.set("views", __dirname+"/views")
app.set("view engine", "handlebars")


/* -- WebSocket -- */
const port = config.port
const httpServer = app.listen( port, () => console.log("Listening in "+port ))
socketServer(httpServer)


/* -- Passport -- */
initializePassport()
app.use(passport.initialize())
app.use(passport.session()) 


/* -- API routes -- */
app.use("/", viewsRouter)
app.use("/api/products", productsRouter)
app.use("/api/carts", cartRouter)
app.use("/api/session", sessionRouter)
app.use("/api/users", usersRouter)
app.use("/loggerTest", loggerRouter)
app.use("/api/payments", paymentsRouter)
