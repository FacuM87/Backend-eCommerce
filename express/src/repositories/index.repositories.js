/* import MongoCartManager from "../dao/mongo/managers/mongo.cart.manager.js";
import MongoMessagesManager from "../dao/mongo/managers/mongo.messages.manager.js";
import MongoProductManager from "../dao/mongo/managers/mongo.product.manager.js";
import MongoTicketManager from "../dao/mongo/managers/mongo.ticket.manager.js";
import MongoUserManager from "../dao/mongo/managers/mongo.user.manager.js"; */

import { Carts, Products, Users, Messages, Tickets } from "../dao/factory.js"
import CartRepository from "./cart.repository.js";
import ChatRepository from "./chat.repository.js";
import ProductRepository from "./product.repository.js";
import TicketRepository from "./ticket.repository.js";
import UserRepository from "./user.repository.js";

export const cartService = new CartRepository(new Carts())
export const chatService = new ChatRepository(new Messages())
export const productService = new ProductRepository(new Products())
export const ticketService = new TicketRepository(new Tickets())
export const userService = new UserRepository(new Users())