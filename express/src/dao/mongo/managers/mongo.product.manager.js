import ProductsModel from "../models/products.model.js";

class MongoProductManager {
    constructor(){
        this.model = ProductsModel
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

    getProductById = async (id) => { return await ProductsModel.findById(id) }

    createProduct = async (title, category, description, price, thumbnail, code, stock) => {
       return await ProductsModel.create({title, category, description, price, thumbnail, code, stock})
    }

    updateProduct = async (id, changes) => { 
       return await ProductsModel.updateOne({ _id: id },{ $set: changes }) 
    }

    deleteProduct = async (id) => { return await ProductsModel.deleteOne({ _id: id }) }


}

export default MongoProductManager