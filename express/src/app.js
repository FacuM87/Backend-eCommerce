import express, { json } from "express"
import handlebars from "express-handlebars"
import viewsRouter from "./router/views.router.js"
import __dirname from "./utils.js"
import { Server } from "socket.io"
import cartRouter from "./router/cart.router.js"
import productsRouter from "./router/products.router.js"
import ProductManager from "./ProductManager.js"

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

/* -- WebSocket -- */
const httpServer = app.listen(8080, () => console.log("Listening in 8080"))
const socketServer = new Server(httpServer) 
socketServer.on("connection", async socket => {
    console.log("connected")
    const juan = new ProductManager("../db.json")
    const products = await juan.getProducts()
    socket.emit("products", products)
    
    socket.on("newProduct", async data =>{
        console.log(data);
        const {title, category, description, price, code, stock} = data
        const message = await juan.addProduct(title, category, description, price, code, stock)
        if (message) {console.log(message)}

        const products = await juan.getProducts()
        socket.emit("products", products)
    })

    socket.on("deleteProduct", async id => {
        console.log(id);
        const message = await juan.deleteProduct(Number(id))
        if (message) { console.log(message); }
        const products = await juan.getProducts()
        socket.emit("products", products)
    })
    
})

/* -- API routes -- */
app.use("/api/products", productsRouter)
app.use("/api/carts", cartRouter)
