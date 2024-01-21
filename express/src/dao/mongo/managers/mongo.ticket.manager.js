import TicketModel from "../models/ticket.model.js";

class MongoTicketManager {
    constructor(){
        this.model=TicketModel
    }

    createTicket = async (amount, purchaser) => { 
        return await TicketModel.create({amount,purchaser})
    }

    getTickets = async () => {
        return await TicketModel.find().lean().exec()
    }
    
    getTicketById = async (id) => {
        return await TicketModel.findById(id)
    }

    updateTicket = async (id, changes) => {
        return await TicketModel.updateOne({_id: id}, { $set: {changes} })
    }
    
    deleteTicket = async (id) => {
        return await TicketModel.deleteOne({ _id: id })
    }
    
}

export default MongoTicketManager