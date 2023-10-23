import express from "express";
import cartRouter from "./router/cart.router.js"
import productsRouter from "./router/products.router.js"

const app = express() 
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('./src/public'))
app.listen(8080, () => console.log("Listening in 8080"))

app.get("/",(req, res) => res.send("<h3>1er PreEntrega - Prog Backend</h3>"))

app.use("/api/products", productsRouter)
app.use("/api/carts", cartRouter)



// import ProductManager from "./ProductManager.js";


/* const juan = new ProductManager("./db.json")

app.get("/products", async (req, res)=> {
    try {
        const products = await juan.getProducts()
        const limit=req.query.limit
        limit? res.send(products.slice(0, limit)): res.json( { products } )
        
    } catch (error) {
        console.log("Error: " + error);
    }
})

app.get("/products/:id", async (req, res) => {
    try {
        const id=req.params.id
        const productRequired = await juan.getProductsById(parseInt(id))
        productRequired? res.json( { productRequired } ) : res.json("Not Found")
        
    } catch (error) {
        console.log("Error " + error);    
    }
}) */
