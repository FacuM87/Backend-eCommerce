import fs from "fs"

class CartManager{
    constructor (){
        this.path = "../carts.json",
        this.carts = []
    }

    createNewCart = async() => {
        try {
            const cart = {
                id: this.carts.length+1,
                products: []
            }
            this.carts.push(cart)
            const carts = JSON.stringify(this.carts)
            await fs.promises.writeFile(this.path, carts)
            return "New cart has been created"
            
        } catch (error) {
            console.log(error);
            return "Couldnt create new cart"
        }
    }

    getCartByID = async (id) => {
        try {
            const carts = JSON.parse(await fs.promises.readFile(this.path, "utf-8"))
            const cart = carts.find(c => c.id === id)
            if (cart) {
                return cart
            }else{undefined}
        } catch (error) {
            console.log(error);
            return "Something went wrong while getting Cart by ID"
        }
    }

    productsInCart = async(id) => {
        try {
            const cart = await this.getCartByID(id)
            
            if (cart){
                const producsInCart = cart.products
                console.log(producsInCart);
                return producsInCart
            }else{ return "There is no cart created with that ID number"}

        } catch (error) {
            console.log(error);
            return "Couldnt bring products from cart"
        }
    }

    addProductToCart = async (productId, cartId) => {
        const cart = await this.getCartByID(cartId)

        const productsInCart = await this.productsInCart(cartId)

        const productToAdd = {
            id:productId,
            quantity: quantity+1
        }

        productsInCart.push(productToAdd)
        cart.products.push(productsInCart)

    }
}


export default CartManager