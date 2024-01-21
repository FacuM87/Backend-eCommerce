import express from "express"
import handlebars from "express-handlebars"
import session from "express-session"
import MongoStore from "connect-mongo"
import __dirname from "./utils.js"
import { Server } from "socket.io"
import viewsRouter from "./router/views.router.js"
import cartRouter from "./router/cart.router.js"
import productsRouter from "./router/products.router.js"
import sessionRouter from "./router/sessions.router.js"
//import ProductManager from "./dao/fsManagers/ProductManager.js"
import mongoose from "mongoose"
import MongoMessagesManager from "./dao/mongo/managers/mongo.messages.manager.js"
import MongoProductManager from "./dao/mongo/managers/mongo.product.manager.js"
import passport from "passport"
import initializePassport from "./config/passport.config.js"
import config from "./config/config.js"
import dotenv from "dotenv"


/* -- Express -- */
const app = express()
dotenv.config()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

/* -- Mongo DB -- */

const mongoURL = config.mongoUrl
const mongoDB = config.mongoDB 

mongoose.connect(mongoURL, {dbName: mongoDB})
    .then(() => {
        console.log("Mongo DB connected")
    })
    .catch(e => {
        console.log("Couldnt connect with DB, error message: "+e);
        res.send(e)
    })   

/* -- Sessions -- */
app.use(session({
    store: MongoStore.create({
        mongoUrl: mongoURL,
        dbName: mongoDB,
        ttl: 300
    }),    
    secret: "secret",
    resave: true,
    saveUninitialized: true
}))  

/* -- HandleBars -- */
app.engine('handlebars', handlebars.engine())
app.use("/static", express.static(__dirname + "/public"))
app.set("views", __dirname+"/views")
app.set("view engine", "handlebars")


/* -- WebSocket -- */

const messagesManager = new MongoMessagesManager()
const productManager = new MongoProductManager()
const port = config.port || 8080

const httpServer = app.listen( port, () => console.log("Listening in "+port ))
const socketServer = new Server(httpServer) 
socketServer.on("connection", async socket => {
    console.log("Client connected")
    /* const juan = new ProductManager("./db.json") */
    
    try {
        const products = await productManager.getAllProducts()
        socket.emit("products", products)
    } catch (error) {
        console.log(error);
        res.send(error)
    }
    
    socket.on("newProduct", async data =>{
        try {
            console.log(data);
            const {title, category, description, price, code, stock} = data
    /*         const message = await juan.addProduct(title, category, description, price, code, stock)
            if (message) {console.log(message)} 
            const products = await juan.getProducts()*/
    
            const newProduct = await productManager.createProduct({title, category, description, price, code, stock}) 
            console.log({newProduct});
            const products = await productManager.getAllProducts()
            socket.emit("products", products)
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    })

    socket.on("deleteProduct", async id => {
        try {
            console.log(id);
    /*         const message = await juan.deleteProduct(Number(id))
            if (message) { console.log(message); } */
            await productManager.deleteProduct(id)
            const products = await productManager.getAllProducts()
            socket.emit("products", products)
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    })
    
    socket.on("message", async ({user, message}) => {
        try {
            console.log({user, message});
            await messagesManager.createMessage(user, message)
            const logs = await messagesManager.getMessages()
            socketServer.emit("logs", logs)
        } catch (error) {
            console.log("Server couldnt redirect chat log to users");
            res.send(error)
        }
    })
})


/* -- Passport -- */
initializePassport()
app.use(passport.initialize())
app.use(passport.session()) 

/* -- API routes -- */
app.use("/", viewsRouter)
app.use("/api/products", productsRouter)
app.use("/api/carts", cartRouter)
app.use("/api/session", sessionRouter)