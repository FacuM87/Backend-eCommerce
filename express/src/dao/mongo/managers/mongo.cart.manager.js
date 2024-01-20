import CartsModel from "../models/carts.model.js";

class MongoCartManager {
        
    constructor(){
        this.model=CartsModel
    }
    
    createNewCart = async () =>{ return await CartsModel.create({products:[]}) }    

    getCartByID = async (cartId) =>{ return await CartsModel.findById(cartId)}

    getPopulatedCart = async (cartId) =>{
        return await CartsModel.findById(cartId).populate("products.product").lean().exec();
    }
    
    getCarts = async () =>{ return await CartsModel.find().lean().exec() } 

    updateCart = async (cartId, changes) =>{ return await CartsModel.updateOne(
        {_id: cartId}, 
        { $set: { products: changes } }
    ) }

}

export default MongoCartManager