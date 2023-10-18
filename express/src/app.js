import express from "express";
import ProductManager from "./ProductManager.js";

const app = express() 
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const juan = new ProductManager("./db.json")

app.get("/",(req, res) => res.send("<h3>3er Desafío - Prog Backend</h3>"))
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
})

app.listen(8080)