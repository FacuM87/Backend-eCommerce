import MessagesModel from "../models/messages.model.js";

class MongoMessagesManager {
    constructor(){
        this.model = MessagesModel()
    }

    createMessage = async (user, message) => {
        return await MessagesModel.create({user, message})
    }

    getMessages = async () => {
        return await MessagesModel.find().lean().exec()
    }


}

export default MongoMessagesManager