const socket = io()
socket.on("products", (products) => { 
        let table = document.getElementsByClassName("tableBody")
        table[0].innerHTML=""
        if (products.length>0 && products) {
            products.forEach(p => {
                table[0].innerHTML+= `
                <tr>
                <td>${p.id}</td>
                <td>${p.title}</td>
                <td>${p.description}</td>
                <td>${p.code}</td>
                <td>${p.price}</td>
                <td>${p.stock}</td>
                <td>${p.category}</td>
                </tr>
                `
            })
        }
})


const form = document.getElementById("form")
form.addEventListener("submit", (e) => {
    e.preventDefault()

    const product = {
        title: document.querySelector("#title").value,
        category: document.querySelector("#category").value,
        description: document.querySelector("#description").value,
        price: Number(document.querySelector("#price").value),
        code: document.querySelector("#code").value,
        stock: Number(document.querySelector("#stock").value)
    }
    socket.emit("newProduct", product)
    console.log("producto enviado");
})


   