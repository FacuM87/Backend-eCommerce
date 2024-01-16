import CartsModel from "../models/carts.model";

export const getCarts = async () =>{
    return await CartsModel.find().lean().exec()
}

export const getCartByID = async (cartId) =>{
    return await CartsModel.findById(cartId)
}

export const createNewCart = async () =>{
    return await CartsModel.create({products:[]})
}

export const updateCart = async () =>{
    return await CartsModel.updateOne()
}