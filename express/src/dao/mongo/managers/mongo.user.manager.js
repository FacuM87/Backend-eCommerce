import UserModel from "../models/user.model.js";

class MongoUserManager{
    constructor(){
        this.model = UserModel
    }
   
    createUser = async (newUser) => {
        return await UserModel.create(newUser)
    }

    getUserByEmail = async (username) => {
        return await UserModel.findOne({ email: username }).lean().exec()
    }

    getUserById = async (id) => {
        return await UserModel.findById(id)
    }

    updateUser = async (email, changes) => {
        return await UserModel.updateOne({email: email}, { $set: { changes } })
    }

    deleteUser = async (userId) => {
        return await UserModel.deleteOne({_id: userId})
    }
}

export default MongoUserManager