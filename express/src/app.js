import express from "express";
import ProductManager from "./ProductManager.js";

const app = express() 
app.use(express.urlencoded({extended:true}))

const juan = new ProductManager("./db.json")

app.get("/",(req, res) => res.send("<h3>3er Desafío - Prog Backend</h3>"))
app.get("/products", async (req, res)=> {

    const products = await juan.getProducts()
    const limit=req.query.limit
    limit? res.send(products.slice(0, limit)): res.json( { products } )

})
app.get("/products/:id", async (req, res) => {
    
    const id=req.params.id
    const productRequired = await juan.getProductsById(parseInt(id))
    productRequired? res.json( { productRequired } ) : res.json("Not Found")
    
})

app.listen(8080)