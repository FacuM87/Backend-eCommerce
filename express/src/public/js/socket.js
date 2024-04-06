const userId = document.getElementById("userId").value
const userRole = document.getElementById("userRole").value
let userEmail = document.getElementById("userEmail").value

if (userRole === "admin") {
    userEmail = userRole
}

const socket = io()
socket.on("products", (products) => { 
        let table = document.getElementsByClassName("tableBody")
        table[0].innerHTML=""
        if (products.length>0 && products) {
            products.forEach(p => {
                if (userRole === "admin"){
                    table[0].innerHTML+= `
                    <tr data-product-id="${p._id}">
                        <td>${p._id}</td>
                        <td>${p.title}</td>
                        <td>${p.description}</td>
                        <td>${p.code}</td>
                        <td>${p.price}</td>
                        <td>${p.stock}</td>
                        <td class="d-none" id="productOwner">${p.owner}</td>
                        <td>${p.category}</td>
                    </tr>
                    `

                } else if (userRole === "premium" && p.owner === userEmail){
                    table[0].innerHTML += `
                    <tr data-product-id="${p._id}"> 
                        <td>${p._id}</td>
                        <td>${p.title}</td>
                        <td>${p.description}</td>
                        <td>${p.code}</td>
                        <td>${p.price}</td>
                        <td>${p.stock}</td>
                        <td class="d-none" id="productOwner">${p.owner}</td>
                        <td>${p.category}</td>
                    </tr>
                `;
                }
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
        owner: userEmail,
        stock: Number(document.querySelector("#stock").value)
    }
    socket.emit("newProduct", product)
    const createProductBtn = document.getElementById("createProductBtn")
    const small = document.createElement("small");
    small.textContent = "New product has been created";
    small.classList.add("ms-2")
    createProductBtn.insertAdjacentElement("afterend", small)
    setTimeout(() => {
        small.remove();
    }, 3000)
    console.log("product has been sent");

    document.querySelector("#title").value=""
    document.querySelector("#category").value=""
    document.querySelector("#description").value=""
    document.querySelector("#price").value=""
    document.querySelector("#code").value=""
    document.querySelector("#stock").value=""

})

const deleteForm = document.getElementById("deleteProduct")
deleteForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const productId = document.querySelector("#productId").value
    console.log(userRole);
    if (userRole === "premium") {
        
        const productIdsDisplayed = Array.from(document.querySelectorAll("tr[data-product-id]")).map(row => row.dataset.productId);

        if (!productIdsDisplayed.includes(productId)) {
            const deleteProductBtn = document.getElementById("deleteProductBtn")
            const small = document.createElement("small");
            small.textContent = "You can only delete your products.";
            small.classList.add("ms-2")
            deleteProductBtn.insertAdjacentElement("afterend", small)
            setTimeout(() => {
                small.remove();
                document.querySelector("#productId").value = ""
            }, 3500)
            return;
        }
    }

    socket.emit("deleteProduct", (productId))
    
    const deleteProductBtn = document.getElementById("deleteProductBtn")
    const small = document.createElement("small");
    small.textContent = "Product has been deleted";
    small.classList.add("ms-2")
    deleteProductBtn.insertAdjacentElement("afterend", small)
    setTimeout(() => {
        small.remove();
    }, 3000)
    console.log("product Id number "+productId+ " has been deleted");
    
    document.querySelector("#productId").value=""
})
   