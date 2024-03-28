import UserModel from "../models/user.model.js";

class MongoUserManager{
    constructor(){
        this.model = UserModel
    }

    getAll = async () => { return await UserModel.find().lean().exec()}
   
    getAllByData = async (inactiveMark) => { return await UserModel.find({last_connection: {$lt: inactiveMark}}).lean().exec()}

    create = async (newUser) => {
        return await UserModel.create(newUser)
    }

    getByData = async (username) => {
        return await UserModel.findOne({ email: username }).lean().exec()
    }

    getById = async (id) => {
        return await UserModel.findById(id)
    }

    update = async (email, changes) => {
        return await UserModel.updateOne({email: email}, { $set: changes })
    }

    delete = async (userId) => {
        return await UserModel.deleteOne({_id: userId})
    }

    deleteVarious = async (inactiveMark) => {
        return await UserModel.deleteMany({last_connection: {$lt: inactiveMark}})
    }
}

export default MongoUserManager