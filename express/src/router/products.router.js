import { Router } from "express" 
import ProductManager from "../ProductManager.js"

const router = Router()

const juan = new ProductManager("./db.json")

router.get("/", async (req, res)=> {
    try {
        const products = await juan.getProducts()
        const limit=req.query.limit
        limit? res.send(products.slice(0, limit)): res.json( { products } )
        
    } catch (error) {
        console.log("Error: " + error);
    }
})

router.get("/:pid", async (req, res) => {
    try {
        const id=req.params.pid
        const productRequired = await juan.getProductsById(parseInt(id))
        productRequired? res.json( { productRequired } ) : res.json("Not Found")
        
    } catch (error) {
        console.log("Error " + error);    
    }
})

router.post("/", async (req,res) => {
    try {
        const product = req.body
        const { title, category, description, price, thumbnail, code, stock } = product

        const productAdded = await juan.addProduct(title, category, description, price, thumbnail, code, stock)

        res.json(productAdded)

    } catch (error) {
        console.log(error);
    }
})

router.put("/:pid", async (req,res) =>{
    try {
        const updateRequest = req.body
    
        const { keyToUpdate, newValue } = updateRequest

        const updateMessage = await juan.updateProduct(parseInt(req.params.pid),keyToUpdate,newValue)
        res.send(updateMessage)
    } catch (error) {
        console.log(error);
    }

})

router.delete("/:pid", async (req,res) => {
    try {
        const id=parseInt(req.params.pid)
        const deletionMessage = await juan.deleteProduct(id)
        res.send(deletionMessage)
    } catch (error) {
        console.log(error);
    }
    
})

export default router