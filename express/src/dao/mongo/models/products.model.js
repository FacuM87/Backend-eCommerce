import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"

const productsCollection = "products"

const productsSchema = new mongoose.Schema({
    title: String,
    category: String,
    description: String,
    price: Number,
    thumbnail: {
        type: Array,
        default:[]
    }, 
    code: String,
    stock: Number,
    status: Boolean,
    owner:{
        type: String,
        default: "admin"
    }
    },{ timestamps:true }
)

productsSchema.plugin(mongoosePaginate)
const productsModel = mongoose.model(productsCollection, productsSchema)

export default productsModel