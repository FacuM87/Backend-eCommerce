import { Server } from "socket.io"
import { chatService, productService } from "./repositories/index.repositories.js"

export const socketServer = (httpServer) => {
    const socketServer = new Server(httpServer)

    socketServer.on("connection", async (socket) => {
        console.log("Client connected")
        /* const juan = new ProductManager("./db.json") */
        
        try {
            const products = await productService.getAllProducts()
            socket.emit("products", products)
        } catch (error) {
            console.log(error);
        }
        
        socket.on("newProduct", async (data) =>{
            try {
                console.log(data);
                const {title, category, description, price, code, stock, owner} = data
        /*         const message = await juan.addProduct(title, category, description, price, code, stock)
                if (message) {console.log(message)} 
                const products = await juan.getProducts()*/

                const newProduct = await productService.createProduct({title, category, description, price, code, stock, owner}) 
                console.log({newProduct});
                const products = await productService.getAllProducts()
                socket.emit("products", products)
            } catch (error) {
                console.log(error);
            }
        })

        socket.on("deleteProduct", async (productId) => {
            try {
                console.log(productId);
        /*         const message = await juan.deleteProduct(Number(productId))
                if (message) { console.log(message); } */
                await productService.deleteProduct(productId)
                const products = await productService.getAllProducts()
                socket.emit("products", products)    
            } catch (error) {
                console.log(error);
            }
        })
        
        socket.on("message", async ({user, message}) => {
            try {
                console.log({user, message});
                await chatService.createMessage(user, message)
                const logs = await chatService.getMessages()
                socketServer.emit("logs", logs)
            } catch (error) {
                console.log("Server couldnt redirect chat log to users");
            }
        })
    })

}