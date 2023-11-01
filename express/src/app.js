import express from "express"
import handlebars from "express-handlebars"
import viewsRouter from "./router/views.router.js"
import __dirname from "./utils.js"
// import { Server } from "socket.io"
import cartRouter from "./router/cart.router.js"
import productsRouter from "./router/products.router.js"

const app = express()

const httpServer = app.listen(8080, () => console.log("Listening in 8080"))
//const socketServer = new Server(httpServer) 

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+"/views")
app.set('view engine', 'handlebars')
app.use('/static', express.static(__dirname + "/public"))

app.use('/', viewsRouter)

app.get("/",(req, res) => res.send("<h3>Server is Working!</h3>"))

app.use("/api/products", productsRouter)
app.use("/api/carts", cartRouter)
