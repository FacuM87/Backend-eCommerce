import express, { json } from "express"
import handlebars from "express-handlebars"
import viewsRouter from "./router/views.router.js"
import __dirname from "./utils.js"
import { Server } from "socket.io"
import cartRouter from "./router/cart.router.js"
import productsRouter from "./router/products.router.js"
//import ProductManager from "./dao/fsManagers/ProductManager.js"
import mongoose from "mongoose"
import ProductModel from "./dao/mongo/models/products.model.js"
import MessagesModel from "./dao/mongo/models/messages.model.js"

/* -- Express -- */
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

/* -- HandleBars -- */
app.engine('handlebars', handlebars.engine())
app.use("/static", express.static(__dirname + "/public"))
app.set("views", __dirname+"/views")
app.set("view engine", "handlebars")
app.use("/", viewsRouter)

/* -- Mongo DB -- */
const mongoURL = "mongodb+srv://Facu1987:x1oJKy30EFuwzMzd@clusterfacu.ehmj1ig.mongodb.net/"
const mongoDB = "ecommerce"
mongoose.connect(mongoURL, {dbName: mongoDB})
    .then(() => {
        console.log("Mongo DB connected")
    })
    .catch(e => {
        console.log(e);
        res.send(e)
    })

/* -- WebSocket -- */
const httpServer = app.listen(8080, () => console.log("Listening in 8080"))
const socketServer = new Server(httpServer) 
socketServer.on("connection", async socket => {
    console.log("Client connected")
    /* const juan = new ProductManager("./db.json") */
    
    try {
        const products = await ProductModel.find().lean().exec()
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
    
            const newProduct = await ProductModel.create({title, category, description, price, code, stock})
            console.log({newProduct});
            const products = await ProductModel.find().lean().exec()
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
            await ProductModel.deleteOne({ _id: id })
            const products = await ProductModel.find().lean().exec()
            socket.emit("products", products)
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    })
    
    socket.on("message", async ({user, message}) => {
        try {
            console.log({user, message});
            await MessagesModel.create({user, message})
            const logs = await MessagesModel.find().lean().exec()
            socketServer.emit("logs", logs)
        } catch (error) {
            console.log("Server couldnt redirect chat log to users");
            res.send(error)
        }
    })
})


/* -- API routes -- */
app.use("/api/products", productsRouter)
app.use("/api/carts", cartRouter)
