import CartsModel from "../models/carts.model.js";

class MongoCartManager {
        
    constructor(){
        this.model=CartsModel
    }
    
    create = async () =>{ return await CartsModel.create({products:[]}) }    
    
    get /* Carts */ = async () =>{ return await CartsModel.find().lean().exec() } 

    getById /* Cart */ = async (cartId) =>{ return await CartsModel.findById(cartId)}

/*     getPopulatedCart = async (cartId) =>{
        return await CartsModel.findById(cartId).populate("products.product").lean().exec();
    } */

    getPopulate = async (cartId) =>{
        return await CartsModel.findById(cartId).populate("products.product").lean().exec();
    }
    
    update /* Cart */ = async (cartId, changes) =>{ return await CartsModel.updateOne(
        {_id: cartId}, 
        { $set: { products: changes } }
    ) }
    
    delete /* Cart */ = async (cartId) => { return await CartsModel.deleteOne({ _id: cartId }) }
}

export default MongoCartManager
