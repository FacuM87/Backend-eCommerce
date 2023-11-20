import mongoose from "mongoose"

const productsCollection = "products"

const productsSchema = new mongoose.Schema({
    title: String,
    category: String,
    description: String,
    price: Number,
    thumbnail: [], 
    code: String, 
    stock: Number,
    status: Boolean
})

const productsModel = mongoose.model(productsCollection, productsSchema)

export default productsModel