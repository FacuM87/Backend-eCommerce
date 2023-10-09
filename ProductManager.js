const fs = require("fs")

class ProductManager {    
    constructor(){
        this.products = []
        this.path = "./db.json"
    }

    validate = async(product) => {
        const productFields = Object.values(product)
        const checkFields = productFields.includes(undefined)

        if (checkFields) {return "ERROR 1: All fields must be filled"} 
        
        try {
            if( fs.existsSync(this.path) ){
                const db = JSON.parse(await fs.promises.readFile(this.path, "utf-8"))
                const checkCode = db.find(p => p.code === product.code)
                if (checkCode) {
                    return "ERROR 2: Product Code is already in use";
                }
            }
        } catch (error) {
            return "DB Validation Error: "+error
        }
    }

    getProductsById = async (id) => {
        try {
            const db = JSON.parse(await fs.promises.readFile(this.path, "utf-8"))
            const productById = db.find(p => p.id === id)
            
            if (productById) {
                console.log(productById);
                return productById
            } else { return console.log("Not Found") }

        } catch (error) {
            return console.log("Error processing DB at getProductsById execution: "+error);
        }
    }

    getProducts = async() => { 
        try {
            if( fs.existsSync(this.path) ){
                const db = JSON.parse(await fs.promises.readFile(this.path, "utf-8"))
                console.log(db); 
                return db
            } else { 
                await fs.promises.writeFile(this.path, JSON.stringify(this.products))
                return console.log(JSON.parse(await fs.promises.readFile(this.path, "utf-8"))) }

        } catch (error) {
            console.log("Error: "+ error)
  
        }
    }
    
    createId = async() => {
        try {
            if( fs.existsSync(this.path) ){
                const db=JSON.parse(await fs.promises.readFile(this.path,"utf-8"))
                const id=db.length+1
                return id
            } else {return 1}
        } catch (error) {
            console.log("Id Creating Error: "+error);
            return 
        }
    }

    addProduct = async (title, description, price, thumbnail, code, stock)=>{
        const product = {
            id: await this.createId(),
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail, 
            code: code, 
            stock: stock
        }

        try {
            const validationErrorMessage = await this.validate(product) 
            if (validationErrorMessage) {
                return console.log(validationErrorMessage)
            }

            if( !fs.existsSync(this.path) ){
                this.products.push(product)
                const db = JSON.stringify(this.products)
                await fs.promises.writeFile(this.path, db)
                console.log("DB file has been successfully created and product Id 1 has been added");
                return            
            }else{
                const db = JSON.parse(await fs.promises.readFile(this.path,"utf-8"))
                const newDB= [...db, product]             
                await fs.promises.writeFile(this.path, JSON.stringify(newDB))
                console.log("Product added to DB");
                return
            }
        } catch (error) {
            console.log("Error: "+error);
        }
    }

    deleteProduct = async(id) => {
        try {
            const db=JSON.parse(await fs.promises.readFile(this.path,"utf-8"))
            const productById = db.find(p => p.id === id)
            const newProductsArray = db.filter(p => p.id != id)
            const newDBString=JSON.stringify(newProductsArray)
            
            if (productById) {
                await fs.promises.writeFile(this.path, newDBString)
                return console.log("Product Id number "+id+ " has been deleted");
            } else{ return console.log("Wrong ID number"); }
    
        } catch (error) {
            console.log("Deleting Error: "+error);
        }   
    }
    
    updateProduct = async (id, keyToUpdate, newValue) =>{
        try {           
            const productToUpdate= await this.getProductsById(id)
            if(productToUpdate){
                const productKeys=Object.keys(productToUpdate)
                const checkKey= productKeys.find(k => k === keyToUpdate)

                if (checkKey) {
                    const db=JSON.parse(await fs.promises.readFile(this.path, "utf-8"))
                    productToUpdate[keyToUpdate]=newValue
                    const index = db.findIndex(p => p.id === id);
                    db[index] = productToUpdate
                    await fs.promises.writeFile(this.path,JSON.stringify(db))

                    return console.log(JSON.parse(await fs.promises.readFile(this.path,"utf-8")));
                    
                }else{ return console.log("Wrong Key") }

            }else{return console.log("Wrong Id") }

        } catch (error) {
            console.log("Updating Error: "+error)
        }        
    }    
}


// --- TESTING --- //

const juan = new ProductManager()

juan.getProducts()
//juan.addProduct("Producto Prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
//juan.getProducts()
//juan.getProductsById(1)
//juan.updateProduct(1, "price", "1597777" )
//juan.deleteProduct(1)


