import express from "express";
import cartRouter from "./router/cart.router.js"
import productsRouter from "./router/products.router.js"

const app = express() 
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('./src/public'))
app.listen(8080, () => console.log("Listening in 8080"))

app.get("/",(req, res) => res.send("<h3>Server is Working!</h3>"))

app.use("/api/products", productsRouter)
app.use("/api/carts", cartRouter)
