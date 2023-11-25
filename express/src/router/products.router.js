import { Router } from "express" 
// import ProductManager from "../dao/fsManagers/ProductManager.js"
import ProductsModel from "../dao/mongo/models/products.model.js" 

const router = Router()

/* const juan = new ProductManager("./db.json") */

router.get("/", async (req, res)=> {
    try {
        /* const products = await juan.getProducts() */
        const products = await ProductsModel.find().lean().exec()
        const limit=req.query.limit
        limit? res.send(products.slice(0, limit)): res.json( { products } )
        
    } catch (error) {
        console.log("Error: " + error);
        res.send(error)
    }
})

router.get("/:pid", async (req, res) => {
    try {
        const id=req.params.pid
        //const productRequired = await juan.getProductsById(parseInt(id))
        const productRequired = await ProductsModel.findById(id)
        productRequired? res.json( { productRequired } ) : res.json("Not Found")
        
    } catch (error) {
        console.log("Error " + error);
        res.send(error)    
    }
})

router.post("/", async (req,res) => {
    try {
        const product = req.body
        const { title, category, description, price, thumbnail, code, stock } = product

        //const productAdded = await juan.addProduct(title, category, description, price, thumbnail, code, stock)
        const productAdded = await ProductsModel.create({title, category, description, price, thumbnail, code, stock})

        res.json(productAdded)

    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

router.put("/:pid", async (req,res) =>{
    try {
        const id = req.params.pid
        const updateRequest = req.body
        const { keyToUpdate, newValue } = updateRequest 
        
        const productUpdated = await ProductsModel.updateOne({_id: id }, {$set: { [keyToUpdate]: newValue }})
        console.log({productUpdated});
        
        res.send({productUpdated})
        
        /*
        const updateMessage = await juan.updateProduct(parseInt(req.params.pid),keyToUpdate,newValue) 
        */
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

router.delete("/:pid", async (req,res) => {
    try {
        const id=parseInt(req.params.pid)
        //const deletionMessage = await juan.deleteProduct(id)
        await ProductsModel.deleteOne(id)
        res.send("Product ID "+id+" has been deleted")
    } catch (error) {
        console.log(error);
        res.send(error)
    }
    
})

export default router
