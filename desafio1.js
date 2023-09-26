
class ProductManager {    
    constructor(){
        this.products = []
    }

    createId (){
        const count = this.products.length
        if (count === 0) return 1

        const product = this.products[count-1]
        
        return product.id + 1
    }

    getProductsById(id){
        const productById = this.products.find(p => p.id === id)
        productById? console.log(productById) : console.log("Not Found")
    }

    getProducts(){ 
        const productsAdded=this.products
        console.log(productsAdded) }

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
    }
}


// --- TESTING --- //

const juan = new ProductManager()

// Get y Add Products
juan.getProducts()
juan.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
juan.getProducts()
console.log("\n")

// Prueba de agregar el mismo producto
juan.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
console.log("\n")

// Products By ID
juan.getProductsById(1)
juan.getProductsById(3)