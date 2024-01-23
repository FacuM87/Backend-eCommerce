import CartsModel from "../models/carts.model.js";

class MongoCartManager {
        
    constructor(){
        this.model=CartsModel
    }
    
    create/* NewCart */ = async () =>{ return await CartsModel.create({products:[]}) }    
    
    getCarts = async () =>{ return await CartsModel.find().lean().exec() } 

    getCartByID = async (cartId) =>{ return await CartsModel.findById(cartId)}

    getPopulatedCart = async (cartId) =>{
        return await CartsModel.findById(cartId).populate("products.product").lean().exec();
    }
    
    updateCart = async (cartId, changes) =>{ return await CartsModel.updateOne(
        {_id: cartId}, 
        { $set: { products: changes } }
    ) }
    
    deleteCart = async (cartId) => { return await CartsModel.deleteOne({ _id: cartId }) }
}

export default MongoCartManager
