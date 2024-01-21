import ProductsModel from "../models/products.model.js";

class MongoProductManager {
    constructor(){
        this.model = ProductsModel
    }

    createProduct = async ({title, category, description, price, code, stock}) => {
       return await ProductsModel.create({title, category, description, price, code, stock})
    }

    getProducts = async (search, query, page, limit, sortValue) => { 
        return await ProductsModel.paginate(search
            , {
                page: query? 1: page,
                limit,
                sort: sortValue,
                lean: true
            })
    }

    getAllProducts = async () => { return await ProductsModel.find().lean().exec()}

    getProductById = async (id) => { return await ProductsModel.findById(id) }

    updateProduct = async (id, changes) => { 
       return await ProductsModel.updateOne({ _id: id },{ $set: changes }) 
    }

    deleteProduct = async (id) => { return await ProductsModel.deleteOne({ _id: id }) }

}

export default MongoProductManager