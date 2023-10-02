
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

    validate(product){
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
    
        this.validate(product)
        this.products.push(product)
    }

    deleteProduct(id){
        const productById = this.products.find(p => p.id === id)
        const newProductsArray = this.products.filter(p => p.id != id)
        productById? (this.products = newProductsArray) : console.log("Wrong ID number");    
    }
    
    updateProduct(id, fieldToUpdate){

    }    
}


// --- TESTING --- //

const juan = new ProductManager()

juan.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
juan.addProduct("producto prueba1", "Este es un producto prueba1", 6500, "Sin imagen", "asdd15945", 38)
console.log("\n");

juan.getProducts()

juan.deleteProduct(3)

juan.getProducts()