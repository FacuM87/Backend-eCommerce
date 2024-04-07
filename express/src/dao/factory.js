import config from "../config/config.js"

export let Carts
export let Products
export let Users
export let Messages
export let Tickets

switch (config.persistence) {
  case "MONGO":
    const { default: CartsMongo } = await import("./mongo/managers/mongo.cart.manager.js")
    const { default: ProductsMongo } = await import("./mongo/managers/mongo.product.manager.js")
    const { default: UsersMongo } = await import("./mongo/managers/mongo.user.manager.js")
    const { default: MessagesMongo } = await import("./mongo/managers/mongo.messages.manager.js")
    const { default: TicketsMongo } = await import("./mongo/managers/mongo.ticket.manager.js")
    Carts = CartsMongo
    Products = ProductsMongo
    Users = UsersMongo
    Messages = MessagesMongo
    Tickets = TicketsMongo
    break
  default:
    throw new Error("Persistence error")
}