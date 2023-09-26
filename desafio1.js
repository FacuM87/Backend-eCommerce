
class ProductManager {    
    constructor(){
        this.products = []
    }

    createId (){
        const count = this.products.length
        if (count === 0) return 1

        const product = this.products[count-1]
        console.log(product);
        
        return product.id + 1

    }

    getProductsById(id){

        const productById = this.products.find(p => p.id === id)
        productById? console.log(productById) : console.log("Not Found")

    }

    getProducts(){ console.log(this.products) }

    addProduct(title, description, price, thumbnail, code, stock){
        
        const id= this.createId()
        
        const product = {
            id:id,
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail, 
            code: code, 
            stock: stock
        }
    
        const productFields = Object.values(product)
        const checkFields = productFields.includes(undefined)

        if (checkFields) {
            console.log("ERROR 1: All fields must be filled");
            return
        } 
        
        
        const checkCode = this.products.find(p => p.code === product.code)
        if (checkCode) {
            console.log("ERROR 2: Product Code is already in use")
            return
        }
       

        this.products.push(product)
        console.log("\nProducts Inluded so far -->")
        this.getProducts()
        console.log("\n");
    }
}


const juan = new ProductManager()

juan.addProduct("PC", "Dell Inspire", 500, "", 1234, 15)
juan.addProduct("Mesa", "Valenziana", 30000, "", 1234, 1)
juan.addProduct("Colchón", "Arredo", 45222, "", 654448, 3)
juan.addProduct("Frazada", "Design", 4800)

console.log("\n\n");
console.log("PRODUCTS INCLUDED (FINAL)-->")
juan.getProducts()
console.log("\n")

console.log("\n")
console.log("PRODUCTS BY ID - SOME QUERIES-->")
juan.getProductsById(2)
juan.getProductsById(4)


